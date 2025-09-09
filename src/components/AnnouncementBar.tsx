import { site } from "../config/site"

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-base-100/90 backdrop-blur border-b border-base-300/40 text-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="badge badge-primary">Promo</span>
          <span className="text-base-content/80">
            ใช้โค้ด <code className="font-semibold">EKS10</code> ลด 10% (ขั้นต่ำ 1,000) — ส่งฟรีเมื่อซื้อครบ 1,500 ฿
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <a className="link link-hover" href="/shipping">Shipping</a>
          <span className="opacity-30">•</span>
          <a className="link link-hover" href="/returns">Returns</a>
          <span className="opacity-30">•</span>
          <a className="link link-hover" href="/warranty">Warranty</a>
        </div>
      </div>
    </div>
  )
}
