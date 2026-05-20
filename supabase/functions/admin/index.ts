import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2'

const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD') ?? ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const BUCKET = 'listing-images'

const supabase: SupabaseClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const corsHeaders: HeadersInit = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-admin-password',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })

const text = (body: string, status = 200) => new Response(body, { status, headers: corsHeaders })

const unauthorized = () => text('Unauthorized', 401)
const notFound = () => text('Not Found', 404)
const badRequest = (msg: string) => text(msg, 400)

const guidExtFromMime = (mime: string): string => {
  if (mime.includes('png')) return 'png'
  if (mime.includes('webp')) return 'webp'
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg'
  return 'bin'
}

const uuid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

interface ImageRef {
  path: string
  alt: string
}

const publicUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`

async function listAll() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return json({ error: error.message }, 500)
  return json(data ?? [])
}

async function getOne(id: string) {
  const { data, error } = await supabase.from('listings').select('*').eq('id', id).maybeSingle()
  if (error) return json({ error: error.message }, 500)
  if (!data) return notFound()
  return json(data)
}

async function create(body: Record<string, unknown>) {
  const required = ['slug', 'status', 'address', 'suburb']
  for (const k of required) {
    if (!body[k] || typeof body[k] !== 'string') {
      return badRequest(`Missing field: ${k}`)
    }
  }
  const payload = {
    slug: body.slug,
    status: body.status,
    address: body.address,
    suburb: body.suburb,
    beds: Number(body.beds ?? 0),
    baths: Number(body.baths ?? 0),
    parking: Number(body.parking ?? 0),
    price: typeof body.price === 'string' ? body.price : '',
    rea_url: typeof body.rea_url === 'string' ? body.rea_url : '',
    published: Boolean(body.published ?? false),
    featured: Boolean(body.featured ?? false),
    images: Array.isArray(body.images) ? body.images : [],
  }
  const { data, error } = await supabase.from('listings').insert(payload).select().single()
  if (error) return json({ error: error.message }, 400)
  return json(data, 201)
}

async function update(id: string, body: Record<string, unknown>) {
  const allowed = [
    'slug',
    'status',
    'address',
    'suburb',
    'beds',
    'baths',
    'parking',
    'price',
    'rea_url',
    'published',
    'featured',
    'images',
  ]
  const patch: Record<string, unknown> = {}
  for (const k of allowed) if (k in body) patch[k] = body[k]
  if (Object.keys(patch).length === 0) return badRequest('Empty patch')
  const { data, error } = await supabase
    .from('listings')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) return json({ error: error.message }, 400)
  if (!data) return notFound()
  return json(data)
}

async function removeListing(id: string) {
  const { data: row } = await supabase.from('listings').select('images').eq('id', id).maybeSingle()
  if (row?.images) {
    const paths = (row.images as ImageRef[]).map((img) => img.path).filter(Boolean)
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths)
  }
  const { error } = await supabase.from('listings').delete().eq('id', id)
  if (error) return json({ error: error.message }, 400)
  return new Response(null, { status: 204, headers: corsHeaders })
}

async function uploadImage(id: string, req: Request) {
  const form = await req.formData()
  const file = form.get('file')
  const alt = (form.get('alt') as string | null) ?? ''
  if (!(file instanceof File)) return badRequest('Missing file')
  const ext = guidExtFromMime(file.type)
  const path = `${id}/${uuid()}.${ext}`
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false })
  if (upErr) return json({ error: upErr.message }, 400)

  const { data: row, error: rowErr } = await supabase
    .from('listings')
    .select('images')
    .eq('id', id)
    .maybeSingle()
  if (rowErr) return json({ error: rowErr.message }, 500)
  if (!row) return notFound()

  const next: ImageRef[] = [...((row.images as ImageRef[]) ?? []), { path, alt }]
  const { error: updErr } = await supabase.from('listings').update({ images: next }).eq('id', id)
  if (updErr) return json({ error: updErr.message }, 400)

  return json({ path, alt, url: publicUrl(path) }, 201)
}

async function removeImage(id: string, index: number) {
  const { data: row, error: rowErr } = await supabase
    .from('listings')
    .select('images')
    .eq('id', id)
    .maybeSingle()
  if (rowErr) return json({ error: rowErr.message }, 500)
  if (!row) return notFound()
  const images = (row.images as ImageRef[]) ?? []
  if (index < 0 || index >= images.length) return badRequest('Bad index')
  const removed = images[index]
  const next = images.filter((_, i) => i !== index)
  if (removed?.path) await supabase.storage.from(BUCKET).remove([removed.path])
  const { error: updErr } = await supabase.from('listings').update({ images: next }).eq('id', id)
  if (updErr) return json({ error: updErr.message }, 400)
  return json({ images: next })
}

async function updateImagesMeta(id: string, body: Record<string, unknown>) {
  if (!Array.isArray(body.images)) return badRequest('images must be an array')
  const { data, error } = await supabase
    .from('listings')
    .update({ images: body.images })
    .eq('id', id)
    .select()
    .single()
  if (error) return json({ error: error.message }, 400)
  if (!data) return notFound()
  return json(data)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  if (!ADMIN_PASSWORD) {
    return text('ADMIN_PASSWORD secret not set on this function', 500)
  }
  if (req.headers.get('x-admin-password') !== ADMIN_PASSWORD) {
    return unauthorized()
  }

  const url = new URL(req.url)
  const parts = url.pathname.split('/').filter(Boolean)
  // Edge functions are mounted at /admin so parts[0] === 'admin'
  const sub = parts.slice(1)

  try {
    if (sub.length === 1 && sub[0] === 'ping' && req.method === 'GET') {
      return json({ ok: true })
    }
    if (sub.length === 1 && sub[0] === 'listings' && req.method === 'GET') {
      return await listAll()
    }
    if (sub.length === 1 && sub[0] === 'listings' && req.method === 'POST') {
      const body = await req.json()
      return await create(body)
    }
    if (sub.length === 2 && sub[0] === 'listings' && req.method === 'GET') {
      return await getOne(sub[1])
    }
    if (sub.length === 2 && sub[0] === 'listings' && req.method === 'PATCH') {
      const body = await req.json()
      return await update(sub[1], body)
    }
    if (sub.length === 2 && sub[0] === 'listings' && req.method === 'DELETE') {
      return await removeListing(sub[1])
    }
    if (sub.length === 3 && sub[0] === 'listings' && sub[2] === 'images' && req.method === 'POST') {
      return await uploadImage(sub[1], req)
    }
    if (sub.length === 3 && sub[0] === 'listings' && sub[2] === 'images' && req.method === 'PUT') {
      const body = await req.json()
      return await updateImagesMeta(sub[1], body)
    }
    if (
      sub.length === 4 &&
      sub[0] === 'listings' &&
      sub[2] === 'images' &&
      req.method === 'DELETE'
    ) {
      const idx = Number(sub[3])
      if (!Number.isFinite(idx)) return badRequest('Bad index')
      return await removeImage(sub[1], idx)
    }
    return notFound()
  } catch (err) {
    console.error(err)
    return json({ error: String((err as Error)?.message ?? err) }, 500)
  }
})
