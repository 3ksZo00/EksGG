type Props = { title: string; subtitle?: string }
export default function PageHeader({ title, subtitle }: Props) {
  return (
    <header className="section page">
      <h1 className="section-title">{title}</h1>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}
