'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Button from '@/components/common/Button'

/**
 * Shopping cart page
 */
export default function CartPage() {
  const { cart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container-custom py-32 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-8 shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="font-space text-4xl font-extrabold text-gray-900 mb-4 tracking-tighter uppercase italic">Your Cart is Empty</h1>
        <p className="font-outfit text-gray-500 mb-10 font-medium text-lg">Your collection is currently empty. Add some masterpieces to get started.</p>
        <Link href="/products">
          <Button variant="primary" size="lg" className="px-12 py-5 rounded-[2rem] font-bold text-[11px] uppercase tracking-[0.25em]">
            Browse Collection
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-40 min-h-screen">
      {/* Heavy Technical Header */}
      <div className="max-w-3xl mb-24 animate-fade-in">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.4em] mb-8 shadow-xl shadow-gray-900/10 italic">
          Terminal / Manifest / Pending
        </div>
        <h1 className="font-space text-5xl md:text-8xl font-extrabold text-gray-900 tracking-tighter uppercase italic leading-[0.85]">
          Inventory <br />
          <span className="text-gray-300">Archive.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">
        {/* Cart Items / Manifest */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white rounded-[3rem] border border-gray-100 p-10 md:p-16 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
            {/* Technical grid overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="relative divide-y-2 divide-gray-900/5">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <Link href="/products" className="inline-flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-all italic">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Re-access Collection
          </Link>
        </div>

        {/* Cart Summary / Logistics */}
        <div className="lg:col-span-1 sticky top-32">
          <div className="bg-gray-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-gray-900/20 mesh-gradient">
            <CartSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}
