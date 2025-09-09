import { Link } from "react-router-dom"
import { formatTHB, CATEGORY_LABELS, Category } from "../data/products"

type Props = {
  id: number
  slug: string
  name: string
  priceTHB: number
  description: string
  image: string
  brand?: string
  category?: Category
}

export default function ProductCard({ id, slug, name, priceTHB, description, image, brand, category }: Props) {
  const to = `/products/${slug}`
  const fallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image"
  }

  return (
    <div className="tile card-hover">
      <figure className="aspect-[4/3] bg-base-300/30">
        <img src={image} alt={name} className="object-contain w-full h-full" onError={fallback} />
      </figure>
      <div className="card-body">
        <Link to={to} className="card-title hover:underline">{name}</Link>

        {(brand || category) && (
          <div className="flex gap-2 flex-wrap text-xs">
            {brand && <Link to={`/brand/${encodeURIComponent(brand)}`} className="badge badge-outline">{brand}</Link>}
            {category && <Link to={`/category/${category}`} className="badge badge-outline">{CATEGORY_LABELS[category]}</Link>}
          </div>
        )}

        <p className="text-sm text-base-content/70">{description}</p>
        <div className="card-actions items-center justify-between pt-2">
          <span className="font-semibold">{formatTHB(priceTHB)}</span>
          <Link to={to} className="btn btn-primary btn-sm">ดูรายละเอียด</Link>
        </div>
      </div>
    </div>
  )
}
