export default function Toggle({ checked, onChange, label, disabled = false }) {
  return (
    <label className={`admin-toggle ${checked ? 'admin-toggle--on' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="admin-toggle__track">
        <span className="admin-toggle__thumb" />
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}
