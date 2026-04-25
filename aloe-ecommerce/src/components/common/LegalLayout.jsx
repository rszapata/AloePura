import Breadcrumb from './Breadcrumb'

export default function LegalLayout({ title, updatedAt, intro, children }) {
  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <Breadcrumb
          items={[{ to: '/', label: 'Inicio' }, { label: title }]}
          className="mb-6"
        />

        {/* Header */}
        <header className="mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#2C2C2A] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {title}
          </h1>
          {updatedAt && (
            <p
              className="text-xs uppercase tracking-wide text-[#9E9E9A]"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Última actualización · {updatedAt}
            </p>
          )}
          {intro && (
            <p className="mt-4 text-[#4A4A4A]" style={{ lineHeight: 1.75 }}>
              {intro}
            </p>
          )}
        </header>

        {/* Content card */}
        <article
          className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-6 sm:p-10 legal-prose"
        >
          {children}
        </article>
      </div>
    </div>
  )
}
