'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { createOrder } from '@/lib/api'

/**
 * Checkout page
 */
export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()

  // Redirect if cart is empty
  if (cart.length === 0) {
    router.push('/cart')
    return null
  }

  const handleCheckout = async (formData) => {
    try {
      const orderData = {
        ...formData,
        items: cart,
        total: cart.reduce(
          (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
          0
        ),
      }
      const order = await createOrder(orderData)

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/order-success?orderId=${order.id}`)
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was an error processing your order. Please try again.')
    }
  }

  return (
    <div className="container-custom py-32 min-h-screen">
      {/* Heavy Technical Header */}
      <div className="max-w-3xl mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.4em] mb-8 shadow-xl shadow-gray-900/10 italic">
          Terminal / Acquisition / Secure
        </div>
        <h1 className="font-space text-5xl md:text-8xl font-extrabold text-gray-900 tracking-tighter uppercase italic leading-[0.85]">
          Logistics <br />
          <span className="text-gray-300">Protocol.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">
        {/* Checkout Form / Protocol */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[3rem] border border-gray-100 p-10 md:p-16 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
            {/* Technical grid overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="relative">
              <CheckoutForm onSubmit={handleCheckout} />
            </div>
          </div>
        </div>

        {/* Order Summary / Matrix */}
        <div className="lg:col-span-1 sticky top-32">
          <div className="bg-gray-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-gray-900/20 mesh-gradient">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}
