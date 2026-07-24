import './UnitToggle.css'

export function UnitToggle({ unit, onToggle, disabled }) {
  return (
    <button
      type="button"
      className="unit-toggle"
      onClick={onToggle}
      disabled={disabled}
      aria-label="Alternar entre Celsius e Fahrenheit"
    >
      <span className={unit === 'metric' ? 'unit-toggle__option unit-toggle__option--active' : 'unit-toggle__option'}>
        °C
      </span>
      <span className="unit-toggle__divider">/</span>
      <span className={unit === 'imperial' ? 'unit-toggle__option unit-toggle__option--active' : 'unit-toggle__option'}>
        °F
      </span>
    </button>
  )
}
