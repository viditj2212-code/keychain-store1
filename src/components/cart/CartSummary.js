import Link from 'next/link'
import Button from '@/components/common/Button'

/**
 * Cart summary component showing totals
 * Flower store design
 */
export default function CartSummary({ cart }) {
  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  )
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="bg-gradient-to-br from-dark-950 to-dark-900 rounded-2xl p-8 shadow-2xl text-white">
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold mb-2">
            Order Summary
          </h3>
          <p className="text-sm text-gray-400">Review your bouquet selection</p>
        </div>

        <div className="space-y-4 py-6 border-y border-white/10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Shipping</span>
            <span className={`font-semibold ${shipping === 0 ? 'text-green-400' : ''}`}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Tax</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-baseline pt-2">
          <span className="font-display text-lg font-bold">Total</span>
          <span className="font-display text-3xl font-bold text-primary-400">${total.toFixed(2)}</span>
        </div>

        {subtotal < 50 && (
          <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-primary-200">
                Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more to qualify for free shipping!
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <Link href="/checkout" className="block">
            <button className="w-full bg-primary-500 text-white h-14 rounded-full font-semibold hover:bg-primary-600 transition-all active:scale-95 shadow-lg shadow-primary-500/30">
              Proceed to Checkout
            </button>
          </Link>
          <Link href="/products" className="block">
            <button className="w-full bg-transparent border-2 border-white/20 text-white h-14 rounded-full font-semibold hover:border-white/40 transition-all active:scale-95">
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-400">Secure Checkout</span>
          </div>
          <div className="flex justify-center gap-6 opacity-40 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
