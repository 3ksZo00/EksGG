import Page from "../components/Page"
import { FormEvent, useState } from "react"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: ส่งไป webhook/Email API ของคุณ
    console.log({ name, email, message })
  }

  return (
    <Page title="Contact" subtitle="สอบถามสินค้า/คำแนะนำได้ทุกเมื่อ">
      <div className="grid md:grid-cols-2 gap-6">
        {/* ข้อมูลการติดต่อ */}
        <div className="tile p-6 space-y-4">
          <div>
            <div className="font-semibold">ที่อยู่ร้าน</div>
            <address className="not-italic text-base-content/70">
              123/45 , สมุทรสาคร 74000
            </address>
          </div>

          <div>
            <div className="font-semibold">อีเมล</div>
            <a className="link" href="mailto:support@example.com">
              EksGG@gmail.com
            </a>
          </div>

          <div>
            <div className="font-semibold">โซเชียล</div>
            <div className="flex flex-wrap gap-2">
              <a className="btn btn-ghost btn-sm" href="#" rel="noopener">Facebook</a>
              <a className="btn btn-ghost btn-sm" href="#" rel="noopener">Instagram</a>
              <a className="btn btn-ghost btn-sm" href="#" rel="noopener">Line</a>
            </div>
          </div>
        </div>

        {/* ฟอร์มติดต่อ */}
        <form className="tile p-6 space-y-4" method="post" onSubmit={onSubmit}>
          <div className="form-control gap-2">
            <label className="label">
              <span className="label-text">ชื่อ</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="ชื่อของคุณ"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control gap-2">
            <label className="label">
              <span className="label-text">อีเมล</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control gap-2">
            <label className="label">
              <span className="label-text">ข้อความ</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={5}
              placeholder="ต้องการสอบถามเรื่อง..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-gradient rounded-xl">
            ส่งข้อความ
          </button>
        </form>
      </div>
    </Page>
  )
}
