export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[#4A4A4A]"
        >
          {label}
          {required && <span className="text-[#E53935] ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={[
          'w-full px-4 py-3 rounded-lg border text-[#4A4A4A] text-base',
          'bg-white placeholder:text-[#9E9E9A]',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[#2D7B4A] focus:border-[#2D7B4A]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F5F5F3]',
          error
            ? 'border-[#E53935] focus:ring-[#E53935]'
            : 'border-[#D8D8D4] hover:border-[#9E9E9A]',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error && <p className="text-xs text-[#E53935]">{error}</p>}
    </div>
  )
}
