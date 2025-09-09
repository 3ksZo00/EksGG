import { useTheme } from "../context/ThemeContext"

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        Theme: <span className="ml-1 font-semibold">{theme}</span>
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
