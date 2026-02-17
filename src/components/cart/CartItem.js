import { useCart } from '@/context/CartContext'
import { getImageUrl } from '@/utils/imageUrl'

/**
 * Individual cart item component
 * Flower store design
 */
export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= (item.stock || 999)) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const itemTotal = (item.salePrice || item.price) * item.quantity

  return (
    <div className="flex gap-4 group pb-6 border-b border-gray-100 last:border-0">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100 group-hover:border-primary-300 transition-all">
        <img
          src={getImageUrl(item.image) || item.image_url || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&auto=format&fit=crop&q=80'}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Fresh badge */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-green-500 shadow-lg"></div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-gray-900 text-base line-clamp-1 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">
              ${(item.salePrice || item.price).toFixed(2)} each
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-10 text-center font-semibold text-gray-900 text-sm">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
              disabled={item.quantity >= (item.stock || 999)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="text-right">
            <p className="font-display text-lg font-bold text-gray-900">${itemTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
