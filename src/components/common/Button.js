/**
 * Reusable button component with variants
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-gray-900/20',
    secondary: 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50',
    outline: 'bg-transparent text-gray-900 border-2 border-gray-100 hover:border-gray-900',
    ghost: 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50',
  }

  const sizes = {
    sm: 'px-6 h-12 text-[10px]',
    md: 'px-8 h-16 text-xs',
    lg: 'px-12 h-20 text-[14px]',
  }

  return (
    <button
      className={`
        relative overflow-hidden font-space font-extrabold uppercase tracking-[0.3em] italic transition-all duration-500 flex items-center justify-center gap-2
        disabled:opacity-30 disabled:cursor-not-allowed active:scale-95
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-shimmer pointer-events-none"></div>
      )}
    </button>
  )
}

