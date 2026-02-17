'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

/**
 * Mobile menu drawer component
 * Slides in from right on mobile devices
 */
export default function MobileMenu({ isOpen, onClose, navLinks }) {
  const { user, profile, logout } = useAuth()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[101] transform transition-transform duration-500 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(227, 126, 175, 0.1) 0%, transparent 50%)'
               }}>
          </div>

          <div className="relative flex flex-col h-full z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18c-1.5 3-4 4.5-7 5m7-5c1.5 3 4 4.5 7 5M5 8c0 7 7 13 7 13s7-6 7-13" />
                  </svg>
                </div>
                <span className="font-logo text-xl font-bold text-gray-900">
                  Petal & Stem
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Section */}
            <div className="p-8">
              {user ? (
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {profile?.first_name?.[0] || user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Welcome back</p>
                        <p className="font-display font-bold text-gray-900">
                          {profile?.first_name || user.email.split('@')[0]}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); onClose(); }}
                      className="p-2 bg-white/50 hover:bg-white rounded-lg transition-all"
                      aria-label="Sign out"
                    >
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={onClose}
                  className="block w-full bg-primary-500 text-white text-center py-4 rounded-full font-semibold hover:bg-primary-600 transition-all shadow-md"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-8 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-4 text-gray-700 hover:text-primary-600 transition-all border-b border-gray-100 last:border-0"
                >
                  <span className="font-display text-xl font-semibold">{link.label}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-8 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                Petal & Stem - Premium Fresh Flowers<br />
                © 2026 All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
