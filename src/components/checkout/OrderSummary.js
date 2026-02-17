import { getImageUrl } from '@/utils/imageUrl'

/**
 * Order summary component for checkout page
 * Flower store design
 */
export default function OrderSummary({ cart }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  )
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-gradient-to-br from-dark-950 to-dark-900 rounded-2xl p-8 shadow-2xl text-white sticky top-24">
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold mb-2">
            Order Summary
          </h3>
          <p className="text-sm text-gray-400">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 group">
              <div className="w-16 h-16 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 border border-white/10">
                <img
                  src={getImageUrl(item.image) || item.image_url || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&auto=format&fit=crop&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-sm line-clamp-1">{item.name}</h4>
                <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-sm">
                ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-4 pt-6 border-t border-white/10">
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

          <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
            <span className="font-display text-lg font-bold">Total</span>
            <span className="font-display text-3xl font-bold text-primary-400">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
            <p className="text-xs text-gray-300">Secure encrypted checkout</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"></div>
            <p className="text-xs text-gray-300">7-day freshness guarantee</p>
          </div>
        </div>
      </div>
    </div>
  )
}
