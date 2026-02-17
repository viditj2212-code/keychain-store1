'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import { getImageUrl } from '@/utils/imageUrl'
import { useNotification } from '@/contexts/NotificationContext'

/**
 * Detailed product view component for flower bouquets
 */
export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [giftMessage, setGiftMessage] = useState('')
  const { addToCart } = useCart()
  const { showToast } = useNotification()

  // Get tomorrow's date as minimum delivery date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  // Ensure we have an array of images
  const images = (product.images && product.images.length > 0)
    ? product.images.map(img => getImageUrl(img))
    : [getImageUrl(product.image) || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&auto=format&fit=crop&q=80']

  const handleAddToCart = () => {
    addToCart(product, quantity)
    showToast(`Added ${quantity} ${product.name} to cart!`, 'success')
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: url
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(url)
        }
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    showToast('Link copied to clipboard!', 'success')
  }

  return (
    <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 items-start relative px-4 md:px-0">
      {/* Left: Image Gallery (55%) */}
      <div className="w-full xl:w-[55%] xl:sticky xl:top-24 space-y-6 animate-fade-in">
        <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-xl">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Floating Info Badge */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fresh Bouquet</p>
                  <h3 className="font-display text-xl font-bold text-gray-900">{product.name}</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold text-green-800">In Stock</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
            {product.isNew && (
              <span className="badge-occasion bg-primary-500 text-white shadow-lg">
                New Arrival
              </span>
            )}
            {product.isFeatured && (
              <span className="badge-occasion bg-yellow-500 text-white shadow-lg">
                Best Seller
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                    ? 'border-primary-500 scale-95 shadow-lg'
                    : 'border-gray-200 opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Details (45%) */}
      <div className="w-full xl:w-[45%] space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="badge-occasion">
              {product.category || 'Seasonal'}
            </span>
            {product.occasion && (
              <span className="text-sm text-gray-500">For {product.occasion}</span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          <p className="font-sans text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="flex items-baseline gap-4">
            {product.salePrice ? (
              <>
                <span className="font-display text-4xl font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
                <span className="font-sans text-xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
                <span className="badge-occasion bg-red-500 text-white">Save ${(product.price - product.salePrice).toFixed(2)}</span>
              </>
            ) : (
              <span className="font-display text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-xl border border-green-200">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-green-800">7-Day Fresh</p>
                <p className="text-xs text-green-600">Guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 bg-primary-50 rounded-xl border border-primary-200">
              <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-primary-800">Same-Day</p>
                <p className="text-xs text-primary-600">Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Date Selector */}
        <div className="space-y-3 p-6 bg-gray-50 rounded-xl">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Delivery Date (Optional)
          </label>
          <input
            type="date"
            min={minDate}
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="input-field"
          />
          <p className="text-xs text-gray-500">Order by 2 PM for same-day delivery</p>
        </div>

        {/* Gift Message */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Add a Gift Message (Optional)
          </label>
          <textarea
            rows="3"
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Write a personal message to include with your bouquet..."
            className="input-field resize-none"
            maxLength={200}
          />
          <p className="text-xs text-gray-500">{giftMessage.length}/200 characters</p>
        </div>

        {/* Quantity & Purchase */}
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Quantity</span>
            <div className="flex items-center gap-4 bg-gray-100 p-1.5 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-primary-500 hover:text-white transition-all active:scale-90 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                </svg>
              </button>
              <span className="font-display text-xl font-bold text-gray-900 w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-primary-500 hover:text-white transition-all active:scale-90 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="col-span-2 btn-primary h-14 text-base flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="btn-outline h-14 flex items-center justify-center"
              title="Share"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Care Instructions */}
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
          <h3 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Care Instructions
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Keep in a cool location away from direct sunlight</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Change water every 2 days for maximum freshness</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Trim stems at an angle every few days</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Remove wilted petals to extend bloom life</span>
            </li>
          </ul>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-4 pt-6">
            <h4 className="font-display text-lg font-bold text-gray-900">What's Included</h4>
            <div className="grid grid-cols-1 gap-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary-300 transition-all">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="font-sans text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
