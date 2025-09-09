type Props = {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function Page({ title, subtitle, children, className="" }: Props) {
  return (
    <div className={`page ${className}`}>
      {(title || subtitle) && (
        <header className="section-sm">
          {title && <h1 className="section-title">{title}</h1>}
          {subtitle && <p className="section-subtitle mt-1">{subtitle}</p>}
        </header>
      )}
      <main className="section">{children}</main>
    </div>
  )
}
