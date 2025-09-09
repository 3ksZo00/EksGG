import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { CartStore, CartLine, Coupon } from "../store/cart"

type CartCtx = {
  lines: CartLine[]
  count: number
  subtotalTHB: number
  discountTHB: number
  totalTHB: number
  coupon: Coupon | null
  add: (productId: number, qty?: number) => void
  setQty: (productId: number, qty: number) => void
  remove: (productId: number) => void
  clear: () => void
  applyCoupon: (code: string) => { ok: boolean; reason?: string }
  removeCoupon: () => void
  refresh: () => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(CartStore.get())
  const [coupon, setCoupon] = useState<Coupon | null>(CartStore.getCoupon())

  const refresh = () => {
    setLines(CartStore.get())
    setCoupon(CartStore.getCoupon())
  }

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.includes("eksgg_")) refresh()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const api = useMemo<CartCtx>(() => ({
    lines,
    count: lines.reduce((a, b) => a + b.qty, 0),
    subtotalTHB: CartStore.subtotalTHB(),
    discountTHB: CartStore.discountTHB(),
    totalTHB: CartStore.totalTHB(),
    coupon,
    add: (productId, qty = 1) => { CartStore.add(productId, qty); refresh() },
    setQty: (productId, qty) => { CartStore.setQty(productId, qty); refresh() },
    remove: (productId) => { CartStore.remove(productId); refresh() },
    clear: () => { CartStore.clear(); refresh() },
    applyCoupon: (code: string) => {
      const res = CartStore.validateCoupon(code, CartStore.subtotalTHB())
      if (res.ok && res.coupon) { CartStore.setCoupon(res.coupon); refresh(); return { ok: true } }
      return { ok: false, reason: res.reason }
    },
    removeCoupon: () => { CartStore.clearCoupon(); refresh() },
    refresh,
  }), [lines, coupon])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
