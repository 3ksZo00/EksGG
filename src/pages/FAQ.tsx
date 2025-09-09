import Page from "../components/Page"

export default function FAQ() {
  return (
    <Page title="FAQ" subtitle="คำถามที่พบบ่อย">
      <div className="join join-vertical w-full tile">
        <div className="collapse collapse-arrow join-item">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">ส่งของใช้เวลากี่วัน?</div>
          <div className="collapse-content text-base-content/70">กทม. 1–2 วันทำการ ต่างจังหวัด 2–4 วันทำการ</div>
        </div>
        <div className="collapse collapse-arrow join-item">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">มีเก็บเงินปลายทางไหม?</div>
          <div className="collapse-content text-base-content/70">มีในบางพื้นที่และบางขนส่ง คิดค่าธรรมเนียมตามจริง</div>
        </div>
        <div className="collapse collapse-arrow join-item">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">ประกันสินค้าอย่างไร?</div>
          <div className="collapse-content text-base-content/70">ส่วนใหญ่รับประกันศูนย์ไทย 1 ปีขึ้นไป</div>
        </div>
      </div>
    </Page>
  )
}
