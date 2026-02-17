'use client'

/**
 * Reusable Button component
 * Variants: primary, secondary, outline, dark
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'

  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30',
    secondary: 'bg-white text-primary-600 border border-primary-200 shadow-sm hover:shadow-md hover:bg-primary-50',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white',
    dark: 'bg-dark-950 text-white hover:bg-dark-900 hover:shadow-lg',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-3.5 text-base',
    xl: 'px-10 py-4 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
