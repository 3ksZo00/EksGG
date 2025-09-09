import { Link, NavLink } from "react-router-dom"
import { site } from "../config/site"
import MiniCart from "./MiniCart"
import ThemeSwitcher from "./ThemeSwitcher"
import MobileMenu from "./MobileMenu"
import { ALL_CATEGORIES, CATEGORY_LABELS } from "../data/products"
import { popularBrands, categoryImages } from "../config/menu"

export default function Header() {
  return (
    <div className="navbar sticky top-0 z-40 bg-base-100/70 backdrop-blur-xl border-b border-base-300/40">
      <div className="container mx-auto">
        {/* LEFT: Logo + Hamburger (mobile) */}
        <div className="navbar-start gap-2">
          <MobileMenu />
          <Link to="/" className="flex items-center gap-3">
            <img src={site.logoSrc} alt={site.name} className="w-10 h-10 object-contain rounded-lg" />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-lg font-bold">{site.name}</span>
              <span className="text-xs text-base-content/60">{site.slogan}</span>
            </div>
          </Link>
        </div>

        {/* CENTER: Desktop Nav (hidden on mobile) */}
        <div className="navbar-center">
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "underline-tab px-3 py-2 rounded-lg text-sm " +
                (isActive ? "underline-tab-active text-primary" : "text-base-content/80 hover:text-base-content")
              }
            >
              หน้าหลัก
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                "underline-tab px-3 py-2 rounded-lg text-sm " +
                (isActive ? "underline-tab-active text-primary" : "text-base-content/80 hover:text-base-content")
              }
            >
              ผลิตภัณฑ์
            </NavLink>

            {/* MEGA MENU: visible on md+ */}
           

            <NavLink
              to="/guide"
              className={({ isActive }) =>
                "underline-tab px-3 py-2 rounded-lg text-sm " +
                (isActive ? "underline-tab-active text-primary" : "text-base-content/80 hover:text-base-content")
              }
            >
              แนะนำ
            </NavLink>

            {/* Info dropdown */}
            <div className="dropdown dropdown-end hidden md:block">
              <div tabIndex={0} role="button" className="underline-tab px-3 py-2 rounded-lg text-sm">
                เพิ่มเติม ▾
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100/95 backdrop-blur-xl border border-base-300/40 rounded-2xl w-56"
              >
                <li><a href="/about">เกี่ยวกับเรา</a></li>
                <li><a href="/contact">ติดต่อ</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/shipping">การจัดส่ง</a></li>
                <li><a href="/returns">คืนสินค้า</a></li>
                <li><a href="/warranty">การรับประกัน</a></li>
                <li><a href="/settings">ตั้งค่า</a></li>
              </ul>
            </div>

            {/* MiniCart — อยู่ในเมนูกึ่งกลางบนเดสก์ท็อป */}
            <MiniCart />
          </nav>
        </div>

        {/* RIGHT: Theme (และบนมือถือแสดงตะกร้าด้วย) */}
        <div className="navbar-end gap-2">
          {/* Mobile cart shortcut */}
          <div className="md:hidden">
            <Link to="/cart" className="btn btn-ghost btn-sm">🛒</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
