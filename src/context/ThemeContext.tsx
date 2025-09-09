import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type ThemeName = string

const KEY = "eksgg_theme"
const KEY_FAB = "eksgg_theme_fab"

type ThemeCtx = {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
  themes: ThemeName[]
  showFab: boolean
  setShowFab: (v: boolean) => void
}

const Ctx = createContext<ThemeCtx | null>(null)

const DEFAULT_THEMES: ThemeName[] = [
   "dark", "light", 
]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => localStorage.getItem(KEY) || "eksgg")
  const [showFab, setShowFab] = useState<boolean>(() => {
    const v = localStorage.getItem(KEY_FAB)
    return v === null ? true : v === "1"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem(KEY, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(KEY_FAB, showFab ? "1" : "0")
  }, [showFab])

  const api = useMemo<ThemeCtx>(() => ({
    theme,
    setTheme: (t) => setThemeState(t),
    themes: DEFAULT_THEMES,
    showFab,
    setShowFab,
  }), [theme, showFab])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
