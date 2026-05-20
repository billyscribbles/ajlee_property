const KEY = 'ajlee.admin.password'

function safeStorage() {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null
  } catch {
    return null
  }
}

export function getStoredPassword() {
  return safeStorage()?.getItem(KEY) ?? ''
}

export function setStoredPassword(password) {
  safeStorage()?.setItem(KEY, password)
}

export function clearStoredPassword() {
  safeStorage()?.removeItem(KEY)
}
