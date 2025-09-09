// src/pages/ProductDetail.tsx
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { findProduct, formatTHB, warrantyLabel } from "../data/products"
import { useCart } from "../context/CartContext"

type Media =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster?: string; vtype: "youtube" | "video/mp4" }

export default function ProductDetail() {
  const { idOrSlug } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const product = findProduct(idOrSlug)

  // สร้างรายการสื่อ (ภาพ/วิดีโอ) — รองรับ YouTube ด้วย
  const mediaList: Media[] = [
    ...(product?.image ? [{ kind: "image" as const, src: product.image }] : []),
    ...((product?.images ?? []).map((src) => ({ kind: "image" as const, src })) as Media[]),
    ...(product?.video
      ? [
          {
            kind: "video" as const,
            src: product.video.src,
            poster: product.video.poster,
            // ถ้า type ใน data เป็น "youtube" จะใช้ youtube, ไม่งั้นถือเป็นไฟล์ mp4
            vtype: product.video.type === "youtube" ? "youtube" : "video/mp4",
          } as Media,
        ]
      : []),
  ]

  const [current, setCurrent] = useState<Media | undefined>(mediaList[0])
  // reset เมื่อเปลี่ยนสินค้า
  useEffect(() => {
    if (mediaList.length) setCurrent(mediaList[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id])

  if (!product) {
    return (
      <div className="container mx-auto p-6">
        <div className="prose">
          <h2>ไม่พบสินค้า</h2>
          <Link to="/products" className="btn">กลับไปหน้า ผลิตภัณฑ์</Link>
        </div>
      </div>
    )
  }

  const fallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = "https://placehold.co/800x600?text=No+Image"
  }

  const handleAdd = () => add(product.id, 1)
  const handleBuyNow = () => { add(product.id, 1); navigate("/cart") }

  return (
    <div className="container mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT: สื่อหลัก + thumbnails (sticky เฉพาะ lg+) */}
        <div className="self-start lg:sticky lg:top-24 space-y-3">
          <div className="rounded-2xl overflow-hidden border border-base-300/40 bg-base-200">
            {/* กรอบสัดส่วนคงที่ ให้รูป/วิดีโอแสดงเท่ากันทุกชิ้น */}
            <div className="relative aspect-[4/3]">
              {current?.kind === "video" ? (
                current.vtype === "youtube" ? (
                  // YouTube: ใช้ iframe
                  <iframe
                    className="absolute inset-0 w-full h-full block rounded-none"
                    src={current.src}
                    title={product.name + " video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  // MP4: ใช้ <video>
                  <video
                    className="absolute inset-0 w-full h-full object-contain block bg-black"
                    src={current.src}
                    poster={current.poster}
                    controls
                    playsInline
                  />
                )
              ) : (
                <img
                  src={current?.src || product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain block"
                  onError={fallback}
                />
              )}
            </div>
          </div>

          {mediaList.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {mediaList.map((m, i) => {
                const active = current?.kind === m.kind && current?.src === m.src
                return (
                  <button
                    key={`${m.kind}-${m.src}-${i}`}
                    type="button"
                    onClick={() => setCurrent(m)}
                    className={
                      "rounded-xl overflow-hidden border aspect-square transition " +
                      (active ? "border-primary ring-2 ring-primary/40" : "border-base-300/40 hover:ring-1 hover:ring-base-300")
                    }
                    aria-pressed={active}
                    title={m.kind === "video" ? "เล่นวิดีโอ" : "ดูรูป"}
                  >
                    {m.kind === "video" ? (
                      <div className="relative w-full h-full bg-base-300/40">
                        {m.poster ? (
                          <img src={m.poster} alt="video poster" className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-base-content/70">Video</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="btn btn-circle btn-xs bg-black/60 border-0 text-white">▶</div>
                        </div>
                      </div>
                    ) : (
                      <img src={m.src} alt={`${product.name} thumbnail`} className="object-contain w-full h-full block" onError={fallback} />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* RIGHT: รายละเอียด */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <div className="text-base-content/70 mb-1">
            {product.brand} • {product.category.toUpperCase()}
          </div>
          <div className="text-2xl font-extrabold mb-4">{formatTHB(product.priceTHB)}</div>

          <p className="mb-4 whitespace-pre-line">{product.description}</p>

          {product.specs?.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2 underline decoration-pink-500">ข้อมูลพื้นฐานของผลิตภัณฑ์</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {product.specs.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* การรับประกัน */}
          <div className="mt-3">
            <div className="rounded-xl border border-base-300/40 bg-base-100/70 p-3 flex items-start gap-3">
              <div className="mask mask-squircle bg-primary/10 text-primary w-8 h-8 flex items-center justify-center">
                <span className="text-lg">🛡️</span>
              </div>
              <div className="text-sm leading-6">
                <div className="font-semibold">การรับประกัน</div>
                <div className="text-base-content/80">
                  {product.warrantyText ? product.warrantyText : `รับประกันศูนย์ไทย ${warrantyLabel(product.warrantyMonths)}`}
                  {" · "}
                  <Link to="/warranty" className="link link-primary">ดูรายละเอียดการเคลม</Link>
                </div>
              </div>
            </div>
          </div>

          {/* ปุ่ม */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn" onClick={handleAdd}>เพิ่มลงตะกร้า</button>
            <button className="btn btn-primary" onClick={handleBuyNow}>ซื้อเลย</button>
            <Link to="/products" className="btn btn-ghost">ดูสินค้าอื่น</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
