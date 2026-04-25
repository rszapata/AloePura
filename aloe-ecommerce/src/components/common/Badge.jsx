const variants = {
  primary: 'bg-[#E8F5E9] text-[#2D7B4A] border border-[#66BB6A]',
  secondary: 'bg-[#26A69A] text-white',
  coral: 'bg-[#E88B7B] text-white',
  gold: 'bg-[#D4AF37] text-white',
  neutral: 'bg-[#E8E8E6] text-[#5A5A55]',
}

export default function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span
      className={[
        'inline-block text-xs font-semibold px-2 py-0.5 rounded-full',
        variants[variant] ?? variants.primary,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
    >
      {children}
    </span>
  )
}
