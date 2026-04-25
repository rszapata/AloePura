const variants = {
  primary:
    'bg-[#2D7B4A] text-white hover:bg-[#3E8F5C] active:bg-[#1f5c35] shadow-sm hover:shadow-md',
  secondary:
    'bg-[#26A69A] text-white hover:bg-[#4DB8A8] active:bg-[#1a857a] shadow-sm hover:shadow-md',
  outline:
    'border-2 border-[#2D7B4A] text-[#2D7B4A] hover:bg-[#E8F5E9] active:bg-[#d0edda]',
  text:
    'text-[#2D7B4A] hover:underline underline-offset-2',
  ghost:
    'text-[#4A4A4A] hover:bg-[#E8E8E6]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'font-accent font-semibold rounded-lg transition-all duration-200 cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D7B4A] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
    >
      {children}
    </button>
  )
}
