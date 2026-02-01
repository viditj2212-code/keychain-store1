/**
 * Loading spinner component
 */
export default function Loading({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className={`${sizes[size]} border-2 border-gray-100 border-t-gray-900 rounded-full animate-spin shadow-2xl shadow-gray-200/50`}></div>
        <div className="absolute inset-0 border-2 border-transparent border-b-gray-300 rounded-full animate-pulse opacity-50"></div>
      </div>
      {text && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="font-outfit text-[10px] font-bold text-gray-900 uppercase tracking-[0.5em] italic animate-pulse">{text !== 'Loading...' ? text : 'INITIALISING SYSTEMS'}</p>
          <div className="w-24 h-0.5 bg-gray-900/10 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-900 origin-left animate-loading-bar"></div>
          </div>
        </div>
      )}
    </div>
  )
}
