import Link from 'next/link'
import { useState, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import { useNotification } from '@/contexts/NotificationContext'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import { getImageUrl } from '@/utils/imageUrl'

/**
 * Product card component for displaying individual products
 * @param {Object} product - Product data object
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { showToast } = useNotification()
  const [isAnimating, setIsAnimating] = useState(false)
  const imgRef = useRef(null)

  const handleAddToCart = (e) => {
    e.preventDefault()
    // Trigger small visual feedback and add to cart
    setIsAnimating(true)
    addToCart(product)
    flyToCart()
    showToast(`Added ${product.name} to cart`, 'success')
    setTimeout(() => setIsAnimating(false), 900)
  }

  const flyToCart = () => {
    try {
      const cartBtn = document.querySelector('button[aria-label="Shopping cart"]')
      const imgEl = imgRef.current
      if (!cartBtn || !imgEl) return

      const imgRect = imgEl.getBoundingClientRect()
      const cartRect = cartBtn.getBoundingClientRect()

      const clone = imgEl.cloneNode(true)
      clone.style.position = 'fixed'
      clone.style.left = `${imgRect.left}px`
      clone.style.top = `${imgRect.top}px`
      clone.style.width = `${imgRect.width}px`
      clone.style.height = `${imgRect.height}px`
      clone.style.transition = 'transform 700ms cubic-bezier(0.2,0.8,0.2,1), opacity 700ms'
      clone.style.zIndex = 9999
      clone.style.pointerEvents = 'none'
      clone.style.borderRadius = '12px'
      document.body.appendChild(clone)

      const deltaX = cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2)
      const deltaY = cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2)
      const scale = 0.15

      requestAnimationFrame(() => {
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale}) rotate(-6deg)`
        clone.style.opacity = '0.6'
      })

      setTimeout(() => {
        clone.remove()
      }, 800)
    } catch (err) {
      // silent
    }
  }

  const handleShare = async (e) => {
    e.preventDefault()
    const url = `${window.location.origin}/products/${product.id}`
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url })
        return
      } catch (err) {
        // fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url)
    showToast('Product link copied to clipboard', 'success')
  }

  return (
    <div className="relative group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:border-gray-900 transition-all duration-700 hover:shadow-2xl hover:shadow-gray-200">
      <Link href={`/products/${product.id}`} className="block overflow-hidden">
        {/* Product Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            ref={imgRef}
            src={getImageUrl(product.image) || 'https://via.placeholder.com/400x400?text=Keychain'}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isAnimating ? 'animate-add-to-cart' : ''}`}
          />

          {/* Share button */}
          <button
            onClick={handleShare}
            title="Share Product"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

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
            <p className="font-poppins text-[9px] font-semibold text-gray-400 uppercase tracking-[0.3em] italic">
              {product.category || 'Essential'} Series
            </p>
            <h3 className="font-poppins text-2xl font-bold text-gray-900 group-hover:text-gray-900 transition-colors truncate uppercase italic tracking-tighter">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <div className="flex flex-col">
              <p className="font-poppins text-[8px] font-semibold text-gray-400 uppercase tracking-widest mb-1 italic">Unit Cost</p>
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="font-poppins text-2xl font-bold text-gray-900 tracking-tighter">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="font-poppins text-sm text-gray-300 line-through font-semibold tracking-tighter">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="font-poppins text-2xl font-bold text-gray-900 tracking-tighter">
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
