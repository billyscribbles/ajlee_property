import { SUPABASE_URL } from './supabase.js'
import { getStoredPassword, clearStoredPassword } from './adminAuth.js'

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

const FUNCTION_BASE = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/admin` : ''

async function call(path, { method = 'GET', body, password, isForm = false } = {}) {
  if (!FUNCTION_BASE) throw new Error('VITE_SUPABASE_URL not set')
  const pw = password ?? getStoredPassword()
  const headers = { 'x-admin-password': pw }
  if (body && !isForm) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${FUNCTION_BASE}${path}`, {
    method,
    headers,
    body: body == null ? undefined : isForm ? body : JSON.stringify(body),
  })

  if (res.status === 401) {
    clearStoredPassword()
    throw new UnauthorizedError()
  }
  if (res.status === 204) return null
  const text = await res.text()
  const data = text ? safeJson(text) : null
  if (!res.ok) {
    const msg = data?.error || text || `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data
}

function safeJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export const adminApi = {
  ping: (password) => call('/ping', { password }),
  listAll: () => call('/listings'),
  getOne: (id) => call(`/listings/${id}`),
  create: (payload) => call('/listings', { method: 'POST', body: payload }),
  update: (id, patch) => call(`/listings/${id}`, { method: 'PATCH', body: patch }),
  remove: (id) => call(`/listings/${id}`, { method: 'DELETE' }),
  uploadImage: (id, file, alt = '') => {
    const form = new FormData()
    form.append('file', file)
    form.append('alt', alt)
    return call(`/listings/${id}/images`, { method: 'POST', body: form, isForm: true })
  },
  setImages: (id, images) => call(`/listings/${id}/images`, { method: 'PUT', body: { images } }),
  removeImage: (id, index) => call(`/listings/${id}/images/${index}`, { method: 'DELETE' }),
}
