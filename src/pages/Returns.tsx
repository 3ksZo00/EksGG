import Page from "../components/Page"
const POSTCARD_1X = "/cards/return.webp"
const ALT_TEXT = "คืนสินค้า"
export default function Returns(){
  return (
    <Page title="Returns & Exchanges" subtitle="ภายใน 7 วันหลังได้รับสินค้า หากสินค้ามีปัญหา">
       <div className="rounded-2xl overflow-hidden border border-base-100/40 shadow-sm hover:shadow-md transition">
        <figure className="relative aspect-[3/2] bg-base-200">
          <img
            src={POSTCARD_1X}
            srcSet={`${POSTCARD_1X} 1x,`}
            alt={ALT_TEXT}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>
      <article className="tile p-6 md:p-8 prose-eksgg">
        <ul>
          <li>สินค้าต้องอยู่ในสภาพสมบูรณ์ พร้อมกล่อง/อุปกรณ์</li>
          <li>ติดต่อทีมงานก่อนส่งกลับทุกครั้ง</li>
        </ul>
      </article>
    </Page>
  )
}
