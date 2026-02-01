import { useCart } from '@/context/CartContext'

/**
 * Individual cart item component
 */
export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= item.stock) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const itemTotal = (item.salePrice || item.price) * item.quantity

  return (
    <div className="flex flex-col sm:flex-row gap-8 py-12 group">
      {/* Heavy Technical Container */}
      <div className="relative w-full sm:w-40 aspect-square flex-shrink-0 overflow-hidden rounded-[2rem] bg-gray-900 border-2 border-transparent group-hover:border-gray-900 transition-all duration-700 shadow-2xl">
        <img
          src={item.image || 'https://via.placeholder.com/100x100?text=Keychain'}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        {/* Unit Status Marker */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
      </div>

      {/* Product Details / Specifications */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-2">
        <div className="flex justify-between items-start gap-6">
          <div className="space-y-2">
            <h3 className="font-space font-extrabold text-gray-900 text-xl sm:text-2xl line-clamp-1 leading-none tracking-tighter uppercase italic">{item.name}</h3>
            <p className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] italic">
              Unit Rate / ${(item.salePrice || item.price).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-300 hover:text-gray-900 transition-all duration-300 p-2 bg-gray-50 hover:bg-white rounded-xl group-hover:rotate-90"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tactical Controls */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center bg-gray-900 rounded-xl overflow-hidden h-12 shadow-xl shadow-gray-900/10">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-12 h-full flex items-center justify-center text-white/40 hover:text-white hover:bg-black transition-all disabled:opacity-10"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <span className="font-space font-extrabold text-lg">-</span>
            </button>
            <span className="w-10 text-center font-space font-extrabold text-white text-sm italic">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-12 h-full flex items-center justify-center text-white/40 hover:text-white hover:bg-black transition-all disabled:opacity-10"
              aria-label="Increase quantity"
              disabled={item.quantity >= item.stock}
            >
              <span className="font-space font-extrabold text-lg">+</span>
            </button>
          </div>

          <div className="text-right">
            <p className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] italic mb-1">Index Sum</p>
            <p className="font-space text-2xl font-extrabold text-gray-900 tracking-tighter uppercase italic leading-none">${itemTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}