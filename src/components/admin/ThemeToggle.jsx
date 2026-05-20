import { Sun, Moon } from 'lucide-react'

const LABELS = {
  light: { name: 'Light', next: 'dark', Icon: Sun },
  dark: { name: 'Dark', next: 'light', Icon: Moon },
}

export default function ThemeToggle({ theme, onChange }) {
  const current = LABELS[theme] || LABELS.dark
  const next = LABELS[current.next]
  const { Icon } = current
  return (
    <button
      type="button"
      className="admin-theme-toggle"
      onClick={() => onChange(current.next)}
      aria-label={`Switch to ${next.name} mode`}
      title={`Theme: ${current.name} — click for ${next.name}`}
    >
      <Icon size={14} aria-hidden="true" />
      <span>{current.name}</span>
    </button>
  )
}
