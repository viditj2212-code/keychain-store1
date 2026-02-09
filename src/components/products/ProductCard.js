import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import { getImageUrl } from '@/utils/imageUrl'

/**
 * Product card component for displaying individual products
 * @param {Object} product - Product data object
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="relative group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:border-gray-900 transition-all duration-700 hover:shadow-2xl hover:shadow-gray-200">
      <Link href={`/products/${product.id}`} className="block overflow-hidden">
        {/* Product Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={getImageUrl(product.image) || 'https://via.placeholder.com/400x400?text=Keychain'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          {/* Badges - Industrial Style */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
            {product.isNew && <Badge variant="primary" className="shadow-lg shadow-gray-900/10">NEW</Badge>}
            {product.isFeatured && <Badge variant="secondary" className="shadow-lg shadow-gray-900/10">LIMITED</Badge>}
            {product.stock === 0 && <Badge variant="danger" className="shadow-lg shadow-red-900/10">DEPLETED</Badge>}
          </div>

          {/* Technical Marker Overlay */}
          <div className="absolute inset-0 border-[20px] border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none"></div>
        </div>

        {/* Product Information */}
        <div className="p-8 flex flex-col space-y-6">
          <div className="space-y-2">
            <p className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] italic">
              {product.category || 'Essential'} Series
            </p>
            <h3 className="font-space text-2xl font-extrabold text-gray-900 group-hover:text-gray-900 transition-colors truncate uppercase italic tracking-tighter">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <div className="flex flex-col">
              <p className="font-outfit text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1 italic">Unit Cost</p>
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="font-space text-2xl font-extrabold text-gray-900 tracking-tighter">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="font-space text-sm text-gray-300 line-through font-bold tracking-tighter">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="font-space text-2xl font-extrabold text-gray-900 tracking-tighter">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-12 h-12 rounded-xl border-2 border-gray-900 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all active:scale-[0.9] disabled:opacity-20 shadow-sm"
              aria-label="Add to cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
