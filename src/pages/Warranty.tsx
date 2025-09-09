import Page from "../components/Page"

const POSTCARD_1X = "/cards/warranty-24m.webp"      // วางไฟล์ใน public/cards/
const POSTCARD_2X = "/cards/warranty-24m.webp"   // (ไม่มีก็ลบ srcSet ออกได้)
const ALT_TEXT = "รับประกันศูนย์ไทย 24 เดือน - รายละเอียดการเคลม"

export default function Warranty(){
  return (
    <Page
      title="Warranty"
      subtitle="รับประกันศูนย์ไทยตามเงื่อนไขของแบรนด์ โดยปกติ 1–2 ปี"
    >
      {/* Postcard Banner */}
      <div className="rounded-2xl overflow-hidden border border-base-200/40 shadow-sm hover:shadow-md transition">
        <figure className="relative aspect-[3/2] bg-base-200">
          <img
            src={POSTCARD_1X}
            srcSet={`${POSTCARD_1X} 1x, ${POSTCARD_2X} 2x`}
            alt={ALT_TEXT}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Left: main text */}
        <article className="tile p-6 md:p-8 prose-eksgg lg:col-span-2">
          <h2>เงื่อนไขการรับประกัน</h2>
          <p>
            สินค้าทุกชิ้นเป็นของแท้และอยู่ภายใต้การรับประกันของผู้นำเข้า/ศูนย์ไทยตามรุ่นสินค้า
            ระยะเวลามาตรฐาน 12–24 เดือน (ระบุไว้ในหน้าสินค้า)
          </p>
          <ul>
            <li>ครอบคลุมความบกพร่องจากการผลิตตามเงื่อนไขของแบรนด์</li>
            <li>ไม่ครอบคลุมความเสียหายจากการใช้งานผิดวิธี ดัดแปลง ทำตก หรือความเสียหายจากของเหลว</li>
            <li>สินค้าต้องมีซีเรียล/สติกเกอร์รับประกันครบถ้วน</li>
          </ul>

          <h3>เอกสารที่ต้องใช้</h3>
          <ul>
            <li>ใบเสร็จ/หลักฐานการสั่งซื้อ</li>
            <li>รูปภาพ/คลิปอาการเสีย (กรณีส่งทางไปรษณีย์)</li>
          </ul>

          <h3>คำแนะนำ</h3>
          <p className="mb-0">
            กรุณาเก็บใบเสร็จและกล่อง/อุปกรณ์ให้ครบ ทีมงานพร้อมช่วยประสานงานกับศูนย์บริการทุกขั้นตอน
          </p>
        </article>

        {/* Right: claim steps / help box */}
        <aside className="tile p-6 md:p-8 space-y-5 h-fit">
          <div>
            <div className="text-lg font-semibold">ขั้นตอนการเคลม</div>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-base-content/80">
              <li>ติดต่อทีมงานเพื่อประเมินอาการ</li>
              <li>เตรียมหลักฐานการซื้อและซีเรียลสินค้า</li>
              <li>ส่งเข้าศูนย์บริการ/หน้าร้านตามที่แจ้ง</li>
            </ol>
          </div>

          <div className="divider my-2" />

          <div>
            <div className="text-lg font-semibold">ติดต่อฝ่ายรับประกัน</div>
            <div className="mt-2 text-sm text-base-content/80 space-y-1">
              <div>อีเมล: <a className="link link-primary" href="mailto:support@example.com">support@example.com</a></div>
              <div>โทร: 02-000-0000 (จ.-ส. 10:00–18:00)</div>
              <div>Line/FB: ส่งรูปอาการเสียเพื่อช่วยวินิจฉัยเบื้องต้น</div>
            </div>
            <div className="mt-3 flex gap-2">
              <a className="btn btn-outline btn-sm" href="/returns">นโยบายการคืนสินค้า</a>
              <a className="btn btn-primary btn-sm" href="/contact">ติดต่อเรา</a>
            </div>
          </div>
        </aside>
      </div>
    </Page>
  )
}
