import { useEffect, useState } from "react"
import Page from "../components/Page"

// ตั้งรายการภาพให้สลับ 
const CARDS = [
  {
    key: "mouse",
    label: "เมาส์",
    img1x: "/cards/guide.webp",
    alt: "ไกด์เมาส์",
  },
  {
    key: "keyboard",
    label: "คีย์บอร์ด",
    img1x: "/cards/guide1.webp",
    img2x: "/cards/guide-kb@2x.webp",
    alt: "ไกด์คีย์บอร์ด",
  },
  
] as const

export default function Guide(){
  const [active, setActive] = useState<(typeof CARDS)[number]["key"]>(CARDS[0].key)

  const current = CARDS.find(c => c.key === active) ?? CARDS[0]

  // กดซ้าย/ขวาเพื่อสลับภาพได้
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
      e.preventDefault()
      const idx = CARDS.findIndex(c => c.key === active)
      const next = e.key === "ArrowRight" ? (idx + 1) % CARDS.length : (idx - 1 + CARDS.length) % CARDS.length
      setActive(CARDS[next].key)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active])

  return (
    <Page title="Gear Guide" subtitle="เลือกอุปกรณ์ให้เหมาะกับมือและสไตล์การเล่นของคุณ">
      {/* Toggle */}
      <div className="mb-4">
        <div className="join">
          {CARDS.map(c => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(c.key)}
              className={
                "btn join-item btn-sm " +
                (active === c.key ? "btn-primary" : "btn-ghost")
              }
              aria-pressed={active === c.key}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Postcard (เปลี่ยนตาม toggle) */}
      <div className="rounded-2xl overflow-hidden border border-base-300/40 shadow-sm hover:shadow-md transition">
        <figure className="relative aspect-[3/2] bg-base-200">
          <img
            src={current.img1x}
            srcSet={`${current.img1x} 1x`}
            alt={current.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>

      {/* เนื้อหาเดิม */}
      <article className="tile p-6 md:p-8 prose-eksgg mt-6">
        <h2>เมาส์: รูปทรง/น้ำหนัก/ผิวสัมผัส</h2>
        <p>เริ่มจากขนาดมือและวิธีจับ (Claw, Palm, Fingertip)…</p>

        <div className="alert alert-info">
          <span>Tip: ถ้าจับ Fingertip ให้ลองน้ำหนักเบา &lt; 60g</span>
        </div>

        <h2>คีย์บอร์ด: ขนาด/สวิตช์/โครง</h2>
        <p>เลือกขนาด 60%/TKL/Full ตามพื้นที่โต๊ะและการใช้งาน…</p>

        <h3>แผ่นรองเมาส์</h3>
        <ul>
          <li>Speed: ลื่น เร็ว เหมาะกับ FPS ที่ใช้ flick</li>
          <li>Control: หนืด คุมง่าย เหมาะกับ tracking</li>
        </ul>
      </article>
    </Page>
  )
}
