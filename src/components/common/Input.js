/**
 * Reusable input component with error handling
 */
export default function Input({
  label,
  error,
  className = '',
  type = 'text',
  children,
  ...props
}) {
  const baseClassName = `input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`

  return (
    <div className={className}>
      {label && (
        <label className="block text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-[0.4em] italic ml-1 font-poppins">
          {label}
          {props.required && <span className="text-gray-900 ml-1 opacity-50">*</span>}
        </label>
      )}

      <div className="relative group">
        {type === 'textarea' ? (
          <textarea
            className={`w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-8 py-5 font-poppins font-semibold uppercase tracking-widest text-gray-900 text-xs italic focus:border-gray-900 focus:bg-white focus:ring-0 transition-all min-h-[120px] ${error ? 'border-red-500' : ''}`}
            {...props}
          />
        ) : type === 'select' ? (
          <select
            className={`w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl px-8 font-poppins font-semibold uppercase tracking-widest text-gray-900 text-xs italic focus:border-gray-900 focus:bg-white focus:ring-0 transition-all appearance-none ${error ? 'border-red-500' : ''}`}
            {...props}
          >
            {children}
          </select>
        ) : (
          <input
            type={type}
            className={`w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl px-8 font-poppins font-semibold uppercase tracking-widest text-gray-900 text-xs italic focus:border-gray-900 focus:bg-white focus:ring-0 transition-all ${error ? 'border-red-500' : ''}`}
            {...props}
          />
        )}

      </div>

      {error && (
        <p className="mt-2 text-[10px] font-semibold text-red-600 uppercase tracking-widest italic ml-1 font-poppins">{error}</p>
      )}
    </div>
  )
}
