import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ajl-admin-theme'
export const ADMIN_THEMES = ['light', 'dark']
const DEFAULT_THEME = 'dark'

export function readStoredAdminTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return ADMIN_THEMES.includes(value) ? value : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function storeAdminTheme(theme) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore: storage may be unavailable (private mode, quota)
  }
}

export function useAdminTheme() {
  const [theme, setTheme] = useState(readStoredAdminTheme)

  useEffect(() => {
    storeAdminTheme(theme)
  }, [theme])

  function cycle() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, cycle }
}
