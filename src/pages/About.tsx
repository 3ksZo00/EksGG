import Page from "../components/Page"
const POSTCARD_1X = "/cards/aboutus.webp"
const ALT_TEXT = "เกี่ยวกับเรา"
export default function About(){
  return (
    <Page title="About" subtitle="ร้านเกมมิ่งเกียร์ของแท้ ส่งไว บริการด้วยใจ">
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
        <h2>เราเป็นใคร</h2>
        <p>Eks GG Shop คัดของแท้คุณภาพ พร้อมให้คำปรึกษาการเลือกเมาส์/คีย์บอร์ด/แผ่นรอง/หูฟังตามสไตล์การเล่นของคุณ</p>

        <h2>ทำไมลูกค้าถึงเลือกเรา</h2>
        <ul>
          <li>สต็อกจริง อัปเดตตลอด</li>
          <li>ส่งไวทั่วประเทศ พร้อมเลขติดตาม</li>
          <li>รับประกันศูนย์ไทย และทีมงานช่วยเคลม</li>
        </ul>

        <h3>ช่องทางติดต่อ</h3>
        <p>อีเมล <a href="mailto:support@example.com">EksGG@gmail.com</a> · Line: @EKS GG/FB: EKS GG/IG: EKS GG </p>
      </article>
    </Page>
  )
}
