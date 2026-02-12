/**
 * Badge component for labels and tags
 */
export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-gray-900 text-white',
    secondary: 'bg-gray-50 text-gray-400 border-gray-100',
    success: 'bg-green-50 text-green-600 border-green-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    danger: 'bg-red-50 text-red-600 border-red-100',
  }

  return (
    <span className={`inline-block px-3 py-1 text-[10px] font-medium font-sans rounded-full border border-transparent ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
