import { CATEGORY_LABELS, ALL_CATEGORIES, ALL_BRANDS, Category } from "../data/products"
import { useEffect, useRef } from "react"

type SortKey = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "newest"

type Props = {
  selCats: Category[]
  selBrands: string[]
  onToggleCat: (c: Category) => void
  onToggleBrand: (b: string) => void
  onReset: () => void
  q: string
  onQChange: (v: string) => void
  min: number | null
  max: number | null
  onMinChange: (n: number | null) => void
  onMaxChange: (n: number | null) => void
  sort: SortKey
  onSortChange: (s: SortKey) => void
}

export default function ProductFilters({
  selCats, selBrands, onToggleCat, onToggleBrand, onReset,
  q, onQChange, min, max, onMinChange, onMaxChange, sort, onSortChange
}: Props) {

  const qRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const el = qRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter") el.blur() }
    el.addEventListener("keydown", onKey as any)
    return () => el.removeEventListener("keydown", onKey as any)
  }, [])

  return (
    <div className="card glass mb-4">
      <div className="card-body gap-4">

        <div className="grid md:grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label"><span className="label-text">ค้นหาชื่อ/คำอธิบาย</span></label>
            <input
              ref={qRef}
              type="text"
              placeholder="เช่น viper, wireless, control"
              value={q}
              onChange={e => onQChange(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">เรียงลำดับ</span></label>
            <select
              className="select select-bordered"
              value={sort}
              onChange={e => onSortChange(e.target.value as SortKey)}
            >
              <option value="newest">ใหม่ล่าสุด</option>
              <option value="price_asc">ราคา: ต่ำ → สูง</option>
              <option value="price_desc">ราคา: สูง → ต่ำ</option>
              <option value="name_asc">ชื่อสินค้า: A → Z</option>
              <option value="name_desc">ชื่อสินค้า: Z → A</option>
            </select>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">ช่วงราคา (บาท)</div>
          <div className="flex items-center gap-2">
            <input
              type="number" min={0} placeholder="ขั้นต่ำ"
              value={min ?? ""}
              onChange={e => onMinChange(e.target.value === "" ? null : Math.max(0, Number(e.target.value)))}
              className="input input-bordered w-40"
            />
            <span>—</span>
            <input
              type="number" min={0} placeholder="ขั้นสูง"
              value={max ?? ""}
              onChange={e => onMaxChange(e.target.value === "" ? null : Math.max(0, Number(e.target.value)))}
              className="input input-bordered w-40"
            />
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">หมวดหมู่</div>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(c => {
              const active = selCats.includes(c)
              return (
                <button
                  key={c}
                  onClick={() => onToggleCat(c)}
                  className={`btn btn-sm ${active ? "btn-primary" : "btn-outline"}`}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">แบรนด์</div>
          <div className="flex flex-wrap gap-2">
            {ALL_BRANDS.map(b => {
              const active = selBrands.includes(b)
              return (
                <button
                  key={b}
                  onClick={() => onToggleBrand(b)}
                  className={`btn btn-sm ${active ? "btn-primary" : "btn-outline"}`}
                >
                  {b}
                </button>
              )
            })}
          </div>
        </div>

        {(selCats.length > 0 || selBrands.length > 0 || q || min !== null || max !== null) && (
          <div className="pt-1">
            <button className="btn btn-sm btn-ghost" onClick={onReset}>ล้างตัวกรองทั้งหมด</button>
          </div>
        )}
      </div>
    </div>
  )
}
