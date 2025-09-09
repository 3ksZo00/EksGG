import { Link } from "react-router-dom"
import { site } from "../config/site"

export default function Footer() {
  return (
    <footer className="mt-16 bg-base-100 border-t border-base-300/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* ซ้าย: แบรนด์/คำบรรยาย */}
          <div className="order-1 md:order-1 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={site.logoSrc}
                alt={site.name}
                className="w-9 h-9 object-contain rounded-xl"
              />
              <div className="font-extrabold tracking-tight text-lg">{site.name}</div>
            </div>
            <p className="text-sm text-base-content/70 leading-6 whitespace-normal break-words">
              {site.description}
            </p>
          </div>

          {/* คอลัมน์กลาง (ว่าง/ลิงก์อื่นในอนาคต) */}
          <div className="order-3 md:order-2 hidden md:block" />

          {/* ขวาสุด: ติดต่อ */}
          <div className="order-2 md:order-3 md:pl-8 md:border-l md:border-base-300/50">
            <div className="font-semibold mb-3">ติดต่อ</div>
            <ul className="space-y-2 text-sm text-base-content/80">
              <li className="flex gap-2">
                <span className="text-base-content/60 shrink-0">โทร:</span>
                <span className="whitespace-normal break-words">{site.contacts.phone}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-base-content/60 shrink-0">อีเมล:</span>
                <a
                  className="link link-hover whitespace-normal break-words"
                  href={`mailto:${site.contacts.email}`}
                >
                  {site.contacts.email}
                </a>
              </li>
              <li className="flex gap-2">
                <span className="text-base-content/60 shrink-0">ไลน์:</span>
                <span className="whitespace-normal break-words">{site.contacts.line}</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-base-content/60 shrink-0">ที่อยู่:</span>
                <address className="not-italic whitespace-pre-line break-words leading-6">
                  {site.contacts.address}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ล่างสุด: ลิขสิทธิ์ */}
      <div className="divider-fade"></div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 text-xs text-base-content/60 text-center">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}
