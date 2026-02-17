'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { useNotification } from '@/contexts/NotificationContext'

/**
 * Checkout page
 */
export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { showToast } = useNotification()

  // Redirect if cart is empty
  if (cart.length === 0 && !isProcessing) {
    if (typeof window !== 'undefined') {
      router.push('/cart')
    }
    return null
  }

  const handleCheckout = async (formData) => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Success scenario
    clearCart()
    showToast('Order placed successfully!', 'success')
    router.push('/checkout/success')
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="container-custom py-12 lg:py-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left: Form */}
          <div className="flex-grow lg:w-2/3 order-2 lg:order-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
              <CheckoutForm onSubmit={handleCheckout} />
            </div>
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}
