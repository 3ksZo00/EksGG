import { products } from "../data/products"

export type CartLine = { productId: number; qty: number }

export type Coupon = {
  code: string
  type: "percent" | "flat"
  value: number
  minSubtotal?: number
}

const KEY_CART = "eksgg_cart_v1"
const KEY_COUPON = "eksgg_coupon_v1"

export const VALID_COUPONS: Coupon[] = [
  { code: "EKS10", type: "percent", value: 10, minSubtotal: 1000 },
  { code: "WELCOME50", type: "flat", value: 50 },
]

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY_CART)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}
function writeCart(lines: CartLine[]) { localStorage.setItem(KEY_CART, JSON.stringify(lines)) }

function readCoupon(): Coupon | null {
  try {
    const raw = localStorage.getItem(KEY_COUPON)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
function writeCoupon(c: Coupon | null) {
  if (!c) localStorage.removeItem(KEY_COUPON)
  else localStorage.setItem(KEY_COUPON, JSON.stringify(c))
}

function subtotalTHB(lines: CartLine[]): number {
  return lines.reduce((sum, l) => {
    const p = products.find(p => p.id === l.productId)
    return p ? sum + p.priceTHB * l.qty : sum
  }, 0)
}

function discountFromCoupon(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) return 0
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0
  if (coupon.type === "percent") return Math.floor((subtotal * coupon.value) / 100)
  return Math.min(subtotal, coupon.value)
}

export const CartStore = {
  get(): CartLine[] { return readCart() },
  set(lines: CartLine[]) { writeCart(lines) },
  clear() { writeCart([]) },

  add(productId: number, qty = 1) {
    const lines = readCart()
    const idx = lines.findIndex(l => l.productId === productId)
    if (idx >= 0) lines[idx].qty += qty
    else lines.push({ productId, qty })
    writeCart(lines)
  },
  setQty(productId: number, qty: number) {
    let lines = readCart().map(l => (l.productId === productId ? { ...l, qty } : l))
    lines = lines.filter(l => l.qty > 0)
    writeCart(lines)
  },
  remove(productId: number) {
    const lines = readCart().filter(l => l.productId !== productId)
    writeCart(lines)
  },
  count(): number {
    return readCart().reduce((a, b) => a + b.qty, 0)
  },

  getCoupon(): Coupon | null { return readCoupon() },
  setCoupon(coupon: Coupon | null) { writeCoupon(coupon) },
  validateCoupon(code: string, currentSubtotal?: number): { ok: boolean; coupon?: Coupon; reason?: string } {
    const c = VALID_COUPONS.find(v => v.code.toLowerCase() === code.trim().toLowerCase())
    if (!c) return { ok: false, reason: "ไม่พบคูปองนี้" }
    const sub = currentSubtotal ?? subtotalTHB(readCart())
    if (c.minSubtotal && sub < c.minSubtotal) {
      return { ok: false, reason: `ยอดขั้นต่ำ ${c.minSubtotal.toLocaleString()} บาท` }
    }
    return { ok: true, coupon: c }
  },
  clearCoupon() { writeCoupon(null) },

  subtotalTHB(): number { return subtotalTHB(readCart()) },
  discountTHB(): number { return discountFromCoupon(this.subtotalTHB(), readCoupon()) },
  totalTHB(): number {
    const sub = this.subtotalTHB()
    const dis = discountFromCoupon(sub, readCoupon())
    return Math.max(0, sub - dis)
  },
}
