'use client'

import { useState, useRef, useEffect } from 'react'

/**
 * Premium Custom Dropdown component
 * Replaces standard HTML select with an interactive, industrial-noir styled component
 */
export default function CustomDropdown({ label, options, value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selectedOption = options.find(opt => opt.value === value) || options[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-[0.4em] italic ml-1 font-sans">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-between px-8 h-16 bg-gray-50 border-2 cursor-pointer rounded-2xl transition-all duration-500 ${isOpen
          ? 'border-gray-900 bg-white shadow-2xl'
          : 'border-gray-100 hover:border-gray-300'
          }`}
      >
        <span className={`font-sans font-semibold uppercase tracking-widest text-xs italic truncate transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-400'}`}>
          {selectedOption.label}
        </span>

        <div className={`transition-transform duration-[0.8s] ease-in-out ${isOpen ? 'rotate-[360deg]' : ''}`}>
          <svg className={`w-5 h-5 ${isOpen ? 'text-gray-900' : 'text-gray-400 opacity-30 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Technical Accent line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gray-900/5 group-hover:bg-gray-900/10 transition-colors"></div>
      </div>

      {/* Options Dropdown / Sequence Matrix */}
      <div className={`absolute z-[100] w-full mt-4 bg-white/98 backdrop-blur-xl border-2 border-gray-900 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 origin-top transform ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}>
        <div className="pt-4 max-h-[300px] overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`px-10 py-5 font-sans font-semibold uppercase tracking-widest text-[10px] italic cursor-pointer transition-all flex items-center justify-between ${value === option.value
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white/50"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
