'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'
import Button from '@/components/common/Button'

/**
 * Full cart page
 */
export default function CartPage() {
  const { cart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container-custom py-20 lg:py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Looks like you haven't added any bouquets yet. Browse our collection to find the perfect arrangement.
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="container-custom py-12 lg:py-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="flex-grow lg:w-2/3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link href="/products" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <CartSummary cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
