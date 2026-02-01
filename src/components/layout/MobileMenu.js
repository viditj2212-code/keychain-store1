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
          className="fixed inset-0 bg-[#0a0a0a]/60 backdrop-blur-sm z-[100] md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[101] transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Technical Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="relative flex flex-col h-full z-10">
            {/* Header / Protocol Entry */}
            <div className="flex items-center justify-between p-12 border-b-2 border-gray-900/5">
              <div className="font-space font-extrabold text-2xl tracking-tighter uppercase italic">
                Terminal<span className="text-gray-300">.</span>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-2xl hover:bg-black transition-all rotate-45 hover:rotate-90 shadow-xl shadow-gray-900/20"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* User Matrix */}
            <div className="p-12">
              {user ? (
                <div className="bg-gray-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-gray-900/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-900 font-space font-extrabold text-xl italic shadow-xl">
                        {profile?.first_name?.[0] || user.email[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-outfit text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 italic">ID_MEMBER</p>
                        <p className="font-space text-lg font-extrabold text-white uppercase italic tracking-tighter truncate max-w-[140px]">
                          {profile?.first_name || user.email.split('@')[0]}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); onClose(); }}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={onClose}
                  className="w-full h-20 bg-gray-900 flex items-center justify-center text-white rounded-[2rem] font-space font-extrabold text-[12px] uppercase tracking-[0.5em] italic hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-gray-900/20"
                >
                  Access_System
                </Link>
              )}
            </div>

            {/* Navigation / Protocol Sequence */}
            <nav className="flex-1 overflow-y-auto px-12 py-4 space-y-4">
              <p className="font-outfit text-[10px] font-bold text-gray-300 uppercase tracking-[0.6em] italic mb-8">Protocol_Sequence</p>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-4 text-gray-400 hover:text-gray-900 transition-all"
                >
                  <span className="font-space text-3xl font-extrabold uppercase italic tracking-tighter group-hover:tracking-normal transition-all duration-500">{link.label}</span>
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Footer / Copyright Protocol */}
            <div className="p-12 border-t-2 border-gray-900/5">
              <p className="font-outfit text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] italic leading-relaxed">
                Industrial Noir Bureau <br />
                All Rights Reserved. © 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
