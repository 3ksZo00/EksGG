// src/pages/Checkout.tsx
import { useState, useMemo, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { genOrderId, saveOrder, type CheckoutInfo, type Order } from "../utils/order"
import { products, findProduct, formatTHB } from "../data/products"
import { calcDiscount, couponHint, normalize } from "../utils/coupon"

type CartRow = { id: number; name: string; priceTHB: number; qty: number; image?: string }
const COUPON_KEY = "eksgg_coupon_code"

// ===== ตัวตรวจความถูกต้อง (ยอมรับ undefined เพื่อกัน TS ฟ้อง) =====
const isValidName  = (s?: string) => !!s && s.trim().length >= 2
const isValidPhone = (s?: string) => !!s && /^0\d{9}$/.test(s)                 // 10 หลัก เริ่มด้วย 0
// อีเมลโดเมนใดก็ได้ (รองรับ .co.th ฯลฯ)
const isValidEmail = (s?: string) => !!s && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(s)

export default function Checkout() {
  const nav = useNavigate()
  const loc = useLocation() as any
  const passed = loc?.state ?? {}

  // ⬅️ ดึงทั้ง lines และ items
  const { lines, items, clear } = useCart() as any

  // ใช้ lines ก่อน ถ้าไม่มีค่อย fallback เป็น items
  const raw = useMemo<any[]>(() => {
    if (Array.isArray(lines) && lines.length) return lines
    if (Array.isArray(items) && items.length) return items
    return []
  }, [lines, items])

  // join ตะกร้า ↔ สินค้า
  const cartDetailed = useMemo<CartRow[]>(() => {
    const byId = new Map(products.map(p => [p.id, p]))
    return raw
      .map((ci: any) => {
        const id  = ci.productId ?? ci.id ?? ci.product?.id
        const qty = Number(ci.qty ?? ci.quantity ?? 1)
        if (!id || qty <= 0) return null
        const base = (ci.name && ci.priceTHB) ? ci : (byId.get(id) ?? findProduct(String(id)))
        if (!base) return null
        return { id, name: base.name, priceTHB: Number(base.priceTHB), qty, image: base.image } as CartRow
      })
      .filter(Boolean) as CartRow[]
  }, [raw])

  const subtotal = useMemo(
    () => cartDetailed.reduce((s, i) => s + i.priceTHB * i.qty, 0),
    [cartDetailed]
  )

  // === คูปอง/ส่วนลด ===
  const [coupon, setCoupon] = useState<string>(() =>
    (passed.coupon as string) || localStorage.getItem(COUPON_KEY) || ""
  )
  useEffect(() => { localStorage.setItem(COUPON_KEY, coupon || "") }, [coupon])

  const discount = useMemo(() => calcDiscount(subtotal, coupon), [subtotal, coupon])

  // === ฟอร์มลูกค้า ===
  const [info, setInfo] = useState<CheckoutInfo>({
    name: "", email: "", phone: "", address: "", note: "",
    shipping: "standard", payMethod: "promptpay"
  })
  const [touched, setTouched] = useState<{name?:boolean; email?:boolean; phone?:boolean}>({})
  const [loading, setLoading] = useState(false)

  // ค่าส่ง
  const shippingFee = useMemo(() => {
    if (!cartDetailed.length) return 0
    if (info.shipping === "express") return 80
    return subtotal >= 1500 ? 0 : 40
  }, [info.shipping, cartDetailed.length, subtotal])

  // ตรวจ valid ทั้งฟอร์ม
  const validName  = isValidName(info.name)
  const validPhone = isValidPhone(info.phone)
  const validEmail = isValidEmail(info.email)
  const formValid  = validName && validPhone && validEmail

  const total = Math.max(0, subtotal - discount) + shippingFee
  const disabled = loading || cartDetailed.length === 0 || !formValid

  const submit = async () => {
    if (disabled) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200)) // จำลองชำระเงิน

    const order: Order = {
      id: genOrderId(),
      createdAt: Date.now(),
      items: cartDetailed,
      subtotal, shippingFee, total, info,
      status: info.payMethod === "cod" ? "COD" : "PAID",
    }
    if (coupon) order.info.note = `${order.info.note || ""} [COUPON:${normalize(coupon)} -${discount}]`.trim()

    saveOrder(order)
    clear?.()
    nav(`/order-success/${order.id}`)
  }

  return (
    <div className="page">
      <header className="section-sm">
        <h1 className="section-title">ชำระเงิน</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ฟอร์มซ้าย */}
        <div className="tile p-6 space-y-4 lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* ชื่อ */}
            <div className="form-control gap-2">
              <label className="label"><span className="label-text">ชื่อ-นามสกุล</span></label>
              <input
                className={`input input-bordered w-full ${touched.name && !validName ? "input-error" : ""}`}
                autoComplete="name"
                value={info.name ?? ""} // กัน runtime หาก type optional
                onChange={e=>setInfo({...info, name:e.target.value})}
                onBlur={()=>setTouched(t=>({...t, name:true}))}
                required
                aria-invalid={touched.name && !validName}
              />
              {touched.name && !validName && (
                <span className="label-text-alt text-error">กรอกอย่างน้อย 2 ตัวอักษร</span>
              )}
            </div>

            {/* อีเมล */}
            <div className="form-control gap-2">
              <label className="label"><span className="label-text">อีเมล</span></label>
              <input
                className={`input input-bordered w-full ${touched.email && !validEmail ? "input-error" : ""}`}
                type="email"
                autoComplete="email"
                value={info.email ?? ""}
                onChange={e=>setInfo({...info, email:e.target.value})}
                onBlur={()=>setTouched(t=>({...t, email:true}))}
                required
                aria-invalid={touched.email && !validEmail}
                placeholder="you@example.com"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                title="รูปแบบอีเมลไม่ถูกต้อง"
              />
              {touched.email && !validEmail && (
                <span className="label-text-alt text-error">กรุณากรอกอีเมลให้ถูกต้อง (ยอมรับทุกโดเมน)</span>
              )}
            </div>

            {/* เบอร์โทร */}
            <div className="form-control gap-2">
              <label className="label"><span className="label-text">เบอร์โทร</span></label>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                className={`input input-bordered w-full ${touched.phone && !validPhone ? "input-error" : ""}`}
                value={info.phone ?? ""}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10)
                  setInfo({ ...info, phone: digits })
                }}
                onBlur={()=>setTouched(t=>({...t, phone:true}))}
                required
                aria-invalid={touched.phone && !validPhone}
                placeholder="08xxxxxxxx"
              />
              {touched.phone && !validPhone && (
                <span className="label-text-alt text-error">ต้องเริ่มด้วย 0 และยาว 10 หลัก</span>
              )}
            </div>

            {/* ที่อยู่จัดส่ง */}
            <div className="form-control gap-2 sm:col-span-2">
              <label className="label"><span className="label-text">ที่อยู่จัดส่ง</span></label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                autoComplete="street-address"
                value={info.address ?? ""}
                onChange={e=>setInfo({...info, address:e.target.value})}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-control gap-2">
              <label className="label"><span className="label-text">ขนส่ง</span></label>
              <select
                className="select select-bordered w-full"
                value={info.shipping}
                onChange={e=>setInfo({...info, shipping: e.target.value as any})}
              >
                <option value="standard">มาตรฐาน (40฿ / ฟรีเมื่อครบ 1,500)</option>
                <option value="express">ด่วน (80฿)</option>
              </select>
            </div>

            <div className="form-control gap-2">
              <label className="label"><span className="label-text">วิธีชำระเงิน</span></label>
              <select
                className="select select-bordered w-full"
                value={info.payMethod}
                onChange={e=>setInfo({...info, payMethod: e.target.value as any})}
              >
                <option value="promptpay">PromptPay</option>
                <option value="card">บัตรเครดิต</option>
                <option value="cod">เก็บเงินปลายทาง</option>
              </select>
            </div>
          </div>

          <div className="form-control gap-2">
            <label className="label"><span className="label-text">หมายเหตุ</span></label>
            <input
              className="input input-bordered w-full"
              value={info.note ?? ""}
              onChange={e=>setInfo({...info, note:e.target.value})}
            />
          </div>

          {info.payMethod === "promptpay" && (
            <div className="alert">
              <span>สแกนตัวอย่าง QR: </span>
              <img src="/mock/qr.jpg" alt="QR" className="h-24 rounded-md border border-base-300/50 ml-3"/>
            </div>
          )}

          {info.payMethod === "card" && (
            <div className="grid sm:grid-cols-3 gap-3">
              <input className="input input-bordered w-full" placeholder="หมายเลขบัตร 4242 4242 4242 4242"/>
              <input className="input input-bordered w-full" placeholder="MM/YY"/>
              <input className="input input-bordered w-full" placeholder="CVC"/>
            </div>
          )}

          <div className="flex gap-2">
            <button className={"btn btn-primary " + (loading ? "loading" : "")} disabled={disabled} onClick={submit}>
              ยืนยันชำระเงิน
            </button>
            <Link to="/cart" className="btn btn-ghost">กลับไปตะกร้า</Link>
          </div>
        </div>

        {/* สรุปคำสั่งซื้อ */}
        <div className="tile p-6 h-fit">
          <div className="font-semibold mb-3">สรุปคำสั่งซื้อ</div>

          {/* คูปอง */}
          <div className="mb-3">
            <div className="join w-full">
              <input
                className="input input-bordered join-item w-full"
                placeholder="ใส่โค้ด เช่น EKS10"
                value={coupon}
                onChange={(e)=>setCoupon(e.target.value)}
              />
              <button className="btn join-item" onClick={()=>setCoupon(normalize(coupon))} type="button">
                ใช้คูปอง
              </button>
            </div>
            <div className="mt-1 text-xs text-base-content/60">{couponHint()}</div>
          </div>

          {/* รายการสินค้า */}
          <ul className="space-y-2 mb-3">
            {cartDetailed.map(i => (
              <li key={i.id} className="flex justify-between text-sm">
                <span>{i.name} × {i.qty}</span>
                <span>{formatTHB(i.priceTHB * i.qty)}</span>
              </li>
            ))}
            {!cartDetailed.length && (
              <li className="text-sm text-base-content/50">ตะกร้าของคุณยังว่าง</li>
            )}
          </ul>

          {/* ยอดรวม */}
          <div className="flex justify-between text-sm text-base-content/70">
            <span>ราคารวม</span><span>{formatTHB(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-base-content/70">
            <span>ส่วนลด {coupon ? `(${normalize(coupon)})` : ""}</span>
            <span className={discount ? "text-success" : ""}>
              {discount ? `- ${formatTHB(discount)}` : formatTHB(0)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-base-content/70">
            <span>ค่าส่ง</span>
            <span>{shippingFee === 0 ? "ฟรี" : formatTHB(shippingFee)}</span>
          </div>

          <div className="divider my-2"></div>

          <div className="flex justify-between font-bold">
            <span>รวมทั้งสิ้น</span><span>{formatTHB(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
