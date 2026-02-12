'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import MobileMenu from './MobileMenu'
import CartDrawer from '@/components/cart/CartDrawer'

/**
 * Header component with navigation and cart
 * Responsive with mobile menu toggle
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart } = useCart()
  const { user, profile, logout } = useAuth()

  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Store' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-gray-900/5">
        <nav className="container-custom py-6">
          <div className="flex items-center justify-between">
            {/* Technical Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-gray-900/20">
                K
              </div>
              <span className="font-display text-xl font-bold text-gray-900 tracking-tighter group-hover:tracking-normal transition-all duration-500">
                Keychain<span className="text-gray-300">.</span>
              </span>
            </Link>

            {/* Desktop Navigation / Protocol */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm font-semibold text-gray-400 hover:text-gray-900 tracking-[0.25em] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Terminal Actions */}
            <div className="flex items-center space-x-8">
              {/* User Identity */}
              <div className="hidden md:block">
                {user ? (
                  <div className="flex items-center gap-8">
                    <button
                      onClick={() => logout()}
                      className="font-sans text-xs font-semibold text-gray-300 hover:text-gray-900 tracking-widest transition-colors"
                    >
                      Logout_
                    </button>
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-sans font-bold text-lg shadow-xl shadow-gray-900/10">
                      {profile?.first_name?.[0] || user.email[0].toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    className="font-sans text-[11px] font-semibold text-gray-900 tracking-[0.3em] hover:opacity-50 transition-all border-b-2 border-gray-900 pb-1"
                  >
                    Access_
                  </Link>
                )}
              </div>

              {/* Manifest Trigger */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-3 bg-gray-50 rounded-2xl text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-500 shadow-lg shadow-gray-200/50 group"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-semibold rounded-lg h-6 w-6 flex items-center justify-center shadow-xl shadow-gray-900/20 border-2 border-white group-hover:bg-red-600 transition-colors">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Command Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-3 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-900/20"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navLinks={navLinks} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
