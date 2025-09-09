import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import CartPage from "./pages/CartPage"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Guide from "./pages/Guide"
import FAQ from "./pages/FAQ"
import Shipping from "./pages/Shipping"
import Returns from "./pages/Returns"
import Warranty from "./pages/Warranty"
import Settings from "./pages/Settings"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import AnnouncementBar from "./components/AnnouncementBar"
import ThemeFab from "./components/ThemeFab"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import Footer from "./components/Footer"

function CategoryRoute() {
  const { cat } = useParams()
  const nav = useNavigate()
  nav(`/products?category=${encodeURIComponent(cat || "")}`, { replace: true })
  return null
}

function BrandRoute() {
  const { brand } = useParams()
  const nav = useNavigate()
  nav(`/products?brand=${encodeURIComponent(brand || "")}`, { replace: true })
  return null
}

export default function App() {
function InlineThemeFab(){ const { showFab } = useTheme(); return showFab ? <ThemeFab/> : null }

  return (
    <CartProvider>
      <ThemeProvider>
      <AnnouncementBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:idOrSlug" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/category/:cat" element={<CategoryRoute />} />
        <Route path="/brand/:brand" element={<BrandRoute />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
          <InlineThemeFab />
    </ThemeProvider>
    </CartProvider>
  )
}
