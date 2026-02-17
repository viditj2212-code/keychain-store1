'use client'

import { useState, useRef, useEffect } from 'react'

/**
 * Custom Dropdown component - Flower store design
 * Replaces standard HTML select with an interactive, premium styled component
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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-between px-4 h-12 bg-white border-2 cursor-pointer rounded-lg transition-all duration-300 ${isOpen
            ? 'border-primary-500 ring-2 ring-primary-200 shadow-md'
            : 'border-gray-200 hover:border-gray-300'
          }`}
      >
        <span className={`font-sans font-medium text-sm truncate transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-700'
          }`}>
          {selectedOption.label}
        </span>

        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className={`w-5 h-5 ${isOpen ? 'text-primary-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Options Dropdown */}
      <div className={`absolute z-[100] w-full mt-2 bg-white border-2 border-primary-500 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${isOpen
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}>
        <div className="py-2 max-h-[280px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`px-4 py-3 font-sans font-medium text-sm cursor-pointer transition-all flex items-center justify-between ${value === option.value
                  ? 'bg-primary-50 text-primary-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
