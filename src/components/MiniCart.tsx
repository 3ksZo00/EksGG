import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { products, formatTHB } from "../data/products"

export default function MiniCart() {
  const { lines, count, subtotalTHB, discountTHB, totalTHB } = useCart()

  const items = lines.map(l => {
    const p = products.find(p => p.id === l.productId)
    return p ? { ...p, qty: l.qty } : null
  }).filter(Boolean) as (typeof products[number] & { qty: number })[]

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <span className="mr-2">ตะกร้า</span>
        <div className="badge badge-primary">{count}</div>
      </div>
      <div tabIndex={0} className="dropdown-content z-[100] mt-3 card card-compact w-96 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">ตะกร้า</span>

          {items.length === 0 ? (
            <div className="text-sm text-base-content/70 py-4">ยังไม่มีสินค้าในตะกร้า</div>
          ) : (
            <ul className="divide-y max-h-64 overflow-auto">
              {items.map(item => (
                <li key={item.id} className="py-2 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-base-200 rounded"/>
                  <div className="min-w-0 flex-1">
                    <div className="truncate">{item.name}</div>
                    <div className="text-xs text-base-content/70">x{item.qty} • {formatTHB(item.priceTHB)}</div>
                  </div>
                  <div className="font-semibold">{formatTHB(item.priceTHB * item.qty)}</div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 text-sm space-y-0.5">
            <div className="flex justify-between"><span>ราคารวม</span><span>{formatTHB(subtotalTHB)}</span></div>
            <div className="flex justify-between"><span>ส่วนลด</span><span>-{formatTHB(discountTHB)}</span></div>
            <div className="flex justify-between font-semibold"><span>รวมทั้งสิ้น</span><span>{formatTHB(totalTHB)}</span></div>
          </div>

          <div className="card-actions justify-end">
            <Link to="/cart" className="btn btn-primary w-full">ไปตะกร้า</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
