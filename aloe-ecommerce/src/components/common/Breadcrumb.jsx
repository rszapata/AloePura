import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * items: [{ to?: string, label: string }] — last item rendered as current (no link).
 */
export default function Breadcrumb({ items, className = '' }) {
  return (
    <nav
      aria-label="Migas de pan"
      className={`flex items-center gap-1.5 text-xs text-[#9E9E9A] ${className}`}
      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
            {isLast || !item.to ? (
              <span className="text-[#4A4A4A]">{item.label}</span>
            ) : (
              <Link to={item.to} className="hover:text-[#2D7B4A] transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
