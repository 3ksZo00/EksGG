import Page from "../components/Page"

export default function Contact(){
  return (
    <Page title="Contact" subtitle="สอบถามสินค้า/คำแนะนำได้ทุกเมื่อ">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="tile p-6 space-y-4">
          <div>
            <div className="font-semibold">ที่อยู่ร้าน</div>
            <div className="text-base-content/70">123/45 ถนนตัวอย่าง, กรุงเทพฯ 10xxx</div>
          </div>
          <div>
            <div className="font-semibold">อีเมล</div>
            <a className="link" href="mailto:support@example.com">support@example.com</a>
          </div>
          <div>
            <div className="font-semibold">โซเชียล</div>
            <div className="flex gap-2">
              <a className="btn btn-ghost btn-sm" href="#">Facebook</a>
              <a className="btn btn-ghost btn-sm" href="#">Instagram</a>
              <a className="btn btn-ghost btn-sm" href="#">Line</a>
            </div>
          </div>
        </div>

        <form className="tile p-6 space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text">ชื่อ</span></label>
            <input className="input input-bordered" placeholder="ชื่อของคุณ" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">อีเมล</span></label>
            <input className="input input-bordered" type="email" placeholder="you@example.com" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">ข้อความ</span></label>
            <textarea className="textarea textarea-bordered" rows={5} placeholder="ต้องการสอบถามเรื่อง..."></textarea>
          </div>
          <button className="btn btn-gradient rounded-xl">ส่งข้อความ</button>
        </form>
      </div>
    </Page>
  )
}
