import './ThemeToggle.css'

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8"
      />
    </svg>
  )
}

export function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Alternar entre tema escuro e claro"
    >
      <span className={theme === 'dark' ? 'theme-toggle__option theme-toggle__option--active' : 'theme-toggle__option'}>
        <MoonIcon />
      </span>
      <span className="theme-toggle__divider" />
      <span className={theme === 'light' ? 'theme-toggle__option theme-toggle__option--active' : 'theme-toggle__option'}>
        <SunIcon />
      </span>
    </button>
  )
}
