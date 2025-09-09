import { useTheme } from "../context/ThemeContext"

export default function ThemeFab() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <div className="dropdown dropdown-top dropdown-end fixed bottom-6 right-6 z-50">
      <div tabIndex={0} role="button" className="btn btn-primary btn-circle shadow-xl">
        {/* simple icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v2m0 12v2m8-8h-2M6 12H4m12.95 5.657-1.414-1.414M6.464 7.05 5.05 5.636m13.9 0-1.414 1.414M6.464 16.95l-1.414 1.414" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100/95 backdrop-blur-xl border border-base-300/40 rounded-2xl w-56 max-h-72 overflow-auto">
        {themes.map(t => (
          <li key={t}>
            <button onClick={() => setTheme(t)} className={t === theme ? "active" : ""}>{t}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
