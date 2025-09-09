import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  products,
  ALL_BRANDS,
  ALL_CATEGORIES,
  CATEGORY_LABELS,
  formatTHB,
  type Product,
} from "../data/products"
import { useCart } from "../context/CartContext"

// 👇 กำหนด type ให้ชัด ลดปัญหา TS เวลาอ้างจาก hook
type SortKey = "popular" | "price_asc" | "price_desc"
type Query = {
  search: string
  category: string
  brand: string
  sort: SortKey
  min: number
  max: number
}

const toNum = (v: string | null) => {
  const n = Number(v ?? "")
  return Number.isFinite(n) ? n : 0
}

function useQueryState() {
  const nav = useNavigate()
  const loc = useLocation()
  const sp = new URLSearchParams(loc.search)

  const [q, setQ] = useState<Query>({
    search: sp.get("q") || "",
    category: sp.get("category") || "",
    brand: sp.get("brand") || "",
    sort: (sp.get("sort") as SortKey) || "popular",
    min: toNum(sp.get("min")),
    max: toNum(sp.get("max")),
  })

  // sync -> URL
  useEffect(() => {
    const next = new URLSearchParams()
    if (q.search) next.set("q", q.search)
    if (q.category) next.set("category", q.category)
    if (q.brand) next.set("brand", q.brand)
    if (q.sort && q.sort !== "popular") next.set("sort", q.sort)
    if (q.min) next.set("min", String(q.min))
    if (q.max) next.set("max", String(q.max))
    nav({ pathname: "/products", search: next.toString() }, { replace: true })
  }, [q, nav])

  return { q, setQ }
}

function applyFilters(list: Product[], q: Query) {
  let res = list.slice()
  if (q.search) {
    const s = q.search.toLowerCase()
    res = res.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
    )
  }
  if (q.category) res = res.filter((p) => p.category === q.category)
  if (q.brand) res = res.filter((p) => p.brand === q.brand)
  if (q.min) res = res.filter((p) => p.priceTHB >= q.min)
  if (q.max) res = res.filter((p) => p.priceTHB <= q.max)

  switch (q.sort) {
    case "price_asc":
      res.sort((a, b) => a.priceTHB - b.priceTHB)
      break
    case "price_desc":
      res.sort((a, b) => b.priceTHB - a.priceTHB)
      break
    default:
      // "popular" -> คงลำดับเดิม (เดโม)
      break
  }
  return res
}

export default function Products() {
  const { q, setQ } = useQueryState()
  const { add } = useCart()

  const list = useMemo(() => applyFilters(products, q), [q])

  const minPrice = useMemo(() => Math.min(...products.map((p) => p.priceTHB)), [])
  const maxPrice = useMemo(() => Math.max(...products.map((p) => p.priceTHB)), [])

  const clearAll = () =>
    setQ({ search: "", category: "", brand: "", sort: "popular", min: 0, max: 0 })

  return (
    <div className="page">
      {/* Header */}
      <header className="section-sm flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="section-title">Products</h1>
          <p className="section-subtitle">เลือกจากหมวดหมู่หรือแบรนด์ที่คุณชอบ</p>
        </div>
        <div className="text-sm text-base-content/70">{list.length} items</div>
      </header>

      {/* Filter Bar */}
      <div className="tile p-4 md:p-5 mb-6">
        <div className="grid gap-3 md:grid-cols-12 items-end">
          {/* ค้นหา */}
          <div className="md:col-span-4">
            <label className="label pb-1"><span className="label-text">ค้นหา</span></label>
            <input
              value={q.search}
              onChange={(e) => setQ((s) => ({ ...s, search: e.target.value }))}
              className="input input-bordered w-full"
              placeholder="เช่น superlight, lamzu, mouse…"
            />
          </div>

          {/* หมวดหมู่ */}
          <div className="md:col-span-3">
            <label className="label pb-1"><span className="label-text">หมวดหมู่</span></label>
            <div className="join w-full">
              <select
                value={q.category}
                onChange={(e) => setQ((s) => ({ ...s, category: e.target.value }))}
                className="select select-bordered join-item w-full"
              >
                <option value="">ทั้งหมด</option>
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
              {q.category && (
                <button
                  className="btn join-item"
                  onClick={() => setQ((s) => ({ ...s, category: "" }))}
                  aria-label="Clear category"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* แบรนด์ */}
          <div className="md:col-span-3">
            <label className="label pb-1"><span className="label-text">แบรนด์</span></label>
            <div className="join w-full">
              <select
                value={q.brand}
                onChange={(e) => setQ((s) => ({ ...s, brand: e.target.value }))}
                className="select select-bordered join-item w-full"
              >
                <option value="">ทั้งหมด</option>
                {ALL_BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {q.brand && (
                <button className="btn join-item" onClick={() => setQ((s) => ({ ...s, brand: "" }))}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* จัดเรียง */}
          <div className="md:col-span-2">
            <label className="label pb-1"><span className="label-text">จัดเรียง</span></label>
            <select
              value={q.sort}
              onChange={(e) => setQ((s) => ({ ...s, sort: e.target.value as SortKey }))}
              className="select select-bordered w-full"
            >
              <option value="popular">แนะนำ</option>
              <option value="price_asc">ราคาต่ำ → สูง</option>
              <option value="price_desc">ราคาสูง → ต่ำ</option>
            </select>
          </div>
        </div>

        {/* ช่วงราคา */}
        <div className="mt-4 grid gap-3 md:grid-cols-12 items-end">
          <div className="md:col-span-3">
            <label className="label pb-1"><span className="label-text">ราคาเริ่ม</span></label>
            <input
              type="number"
              min={0}
              placeholder={String(minPrice)}
              value={q.min || ""}
              onChange={(e) => setQ((s) => ({ ...s, min: toNum(e.target.value) }))}
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:col-span-3">
            <label className="label pb-1"><span className="label-text">ราคาสูงสุด</span></label>
            <input
              type="number"
              min={0}
              placeholder={String(maxPrice)}
              value={q.max || ""}
              onChange={(e) => setQ((s) => ({ ...s, max: toNum(e.target.value) }))}
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:col-span-6 flex items-end justify-end gap-2">
            <button className="btn btn-ghost" onClick={clearAll}>ล้างทั้งหมด</button>
            <Link to="/products" className="btn btn-gradient rounded-xl">Shop All</Link>
          </div>
        </div>
      </div>

      {/* ผลลัพธ์สินค้า */}
      {list.length === 0 ? (
        <div className="tile p-6 text-base-content/70">ไม่พบสินค้าที่ตรงกับตัวกรอง</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <div key={p.id} className="tile card-hover overflow-hidden">
              <Link to={`/products/${p.slug}`}>
                <figure className="aspect-[4/3] bg-base-300/30">
                  <img src={p.image} alt={p.name} className="object-contain w-full h-full" />
                </figure>
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="badge badge-ghost">{p.brand}</span>
                  <span className="text-sm text-base-content/60">{CATEGORY_LABELS[p.category]}</span>
                </div>
                <Link to={`/products/${p.slug}`} className="mt-2 block font-semibold line-clamp-1">
                  {p.name}
                </Link>
                <div className="mt-1">
                  <span className="text-lg font-extrabold">{formatTHB(p.priceTHB)}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
  to={`/products/${p.slug}`}
  className="btn  btn-sm btn-outline w-30 sm:w-auto px-6 whitespace-nowrap"
>
  รายละเอียด
</Link>

                  <button className="btn btn-sm btn-primary w-30 sm:w-auto px-5 whitespace-nowrap" onClick={() => add(p.id, 1)}>
  เพิ่มลงตะกร้า
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
