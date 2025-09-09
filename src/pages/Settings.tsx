import ThemeSwitcher from "../components/ThemeSwitcher"
import { useTheme } from "../context/ThemeContext"

export default function Settings() {
  const { theme, showFab, setShowFab } = useTheme()
  return (
    <div className="section">
      <h1 className="section-title mb-4">ตั้งค่า</h1>
      <div className="card glass p-6 space-y-6">
        <div>
          <div className="font-semibold mb-2">ธีม</div>
          <ThemeSwitcher />
          <div className="text-sm text-base-content/70">ธีม ปัจจุบัน: <span className="font-semibold">{theme}</span></div>
        </div>
        <div>
          <div className="font-semibold mb-2">ปุ่มธีมแบบลอย</div>
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="toggle toggle-primary" checked={showFab} onChange={e => setShowFab(e.target.checked)} />
            <span className="label-text">เปิดปุ่มธีมแบบลอย (ขวาล่าง)</span>
          </label>
        </div>
      </div>
    </div>
  )
}
