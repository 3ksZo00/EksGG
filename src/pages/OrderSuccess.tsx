import { useParams, Link } from "react-router-dom"
import { getOrder } from "../utils/order"
import { formatTHB } from "../data/products"

export default function OrderSuccess(){
  const { orderId } = useParams()
  const o = orderId ? getOrder(orderId) : undefined

  if (!o) {
    return (
      <div className="page section">
        <div className="tile p-6">
          <div className="font-semibold">ไม่พบคำสั่งซื้อ</div>
          <Link to="/" className="btn btn-primary mt-3">กลับหน้าแรก</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page section">
      <div className="tile p-6 md:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="section-title">สั่งซื้อสำเร็จ</h1>
            <p className="section-subtitle">รหัสคำสั่งซื้อ: <span className="font-mono">{o.id}</span></p>
          </div>
          <span className={"badge " + (o.status==="COD" ? "badge-warning" : "badge-success")}>
            {o.status === "COD" ? "เก็บเงินปลายทาง" : "ชำระเงินแล้ว (ปลอม)"}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <div className="font-semibold mb-2">สินค้า</div>
            <ul className="space-y-2">
              {o.items.map(i => (
                <li key={i.id} className="flex justify-between text-sm">
                  <span>{i.name} × {i.qty}</span>
                  <span>{formatTHB(i.priceTHB * i.qty)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="tile p-4 h-fit">
            <div className="flex justify-between text-sm text-base-content/70">
              <span>สินค้า</span><span>{formatTHB(o.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-base-content/70">
              <span>จัดส่ง</span><span>{o.shippingFee ? formatTHB(o.shippingFee) : "ฟรี"}</span>
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between font-bold">
              <span>รวมทั้งสิ้น</span><span>{formatTHB(o.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Link to="/products" className="btn btn-ghost">ซื้อสินค้าต่อ</Link>
          <button className="btn btn-primary" onClick={()=>window.print()}>พิมพ์ใบสรุป</button>
        </div>
      </div>
    </div>
  )
}
