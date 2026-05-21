// Single source of truth for design tokens.
// Swap a brand's look by editing this file — applyTheme.js writes these
// onto :root as CSS custom properties at app boot.

export const theme = {
  colors: {
    bg: '#0a0a0c',
    'bg-alt': '#111114',
    'bg-card': '#16161a',
    text: '#f5f5f4',
    'text-soft': '#d4d4d4',
    muted: '#8a8a8a',
    accent: '#ffffff',
    'accent-dark': '#e5e5e5',
    'accent-light': '#2a2a2e',
    'accent-glow': 'rgba(255, 255, 255, 0.08)',
    star: '#f2c14e',
    border: 'rgba(255, 255, 255, 0.08)',
    'border-strong': 'rgba(255, 255, 255, 0.22)',
    dark: '#000000',
  },
  fonts: {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  radii: {
    sm: '4px',
    md: '6px',
    lg: '10px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 8px 24px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.35)',
    lg: '0 24px 60px rgba(0, 0, 0, 0.55), 0 8px 24px rgba(0, 0, 0, 0.4)',
    accent: '0 8px 32px rgba(255, 255, 255, 0.06)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '240ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '420ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
