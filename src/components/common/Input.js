'use client'

/**
 * Reusable Input component with label and validation error
 */
export default function Input({
  label,
  error,
  className = '',
  id,
  required,
  ...props
}) {
  const inputId = id || props.name

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-3 border-2 rounded-lg font-normal text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/30'
            : 'border-gray-200 bg-white focus:border-primary-500 focus:ring-primary-200'
          }`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 font-medium animate-pulse">{error}</p>
      )}
    </div>
  )
}
