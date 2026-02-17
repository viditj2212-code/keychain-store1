'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Button from '@/components/common/Button'

/**
 * Product Card Component
 * Displays individual flower bouquet with image, details, and add to cart
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToCart(true)
    await addToCart(product)

    // Show animation
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 600)
  }

  // Get occasion badge if available
  const occasion = product.category || product.occasion

  return (
    <div className="group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="card-premium hover-lift">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 animate-pulse"></div>
            )}

            <img
              src={product.image_url || product.image || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&auto=format&fit=crop&q=80'}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />

            {/* Occasion Badge */}
            {occasion && (
              <div className="absolute top-3 left-3 badge-occasion">
                {occasion}
              </div>
            )}

            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="bg-white text-primary-600 px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Quick View
              </span>
            </div>

            {/* Stock Badge */}
            {product.stock_quantity && product.stock_quantity < 5 && product.stock_quantity > 0 && (
              <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Only {product.stock_quantity} left!
              </div>
            )}

            {/* Out of Stock */}
            {product.stock_quantity === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-5">
            <div className="mb-3">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              <p className="font-sans text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features/Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Fresh Guaranteed
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Same-Day
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div>
                <p className="font-display text-2xl font-bold text-gray-900">
                  ${product.salePrice || product.price}
                </p>
                {(product.salePrice || (product.original_price && product.original_price > product.price)) && (
                  <p className="text-sm text-gray-400 line-through">
                    ${product.salePrice ? product.price : product.original_price}
                  </p>
                )}
              </div>

              {(product.stock_quantity === undefined || product.stock_quantity > 0) ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`flex-shrink-0 bg-primary-500 text-white px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-600 active:scale-95 transition-all shadow-md hover:shadow-lg disabled:opacity-50 ${isAddingToCart ? 'animate-add-to-cart' : ''
                    }`}
                >
                  {isAddingToCart ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Add
                    </span>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="flex-shrink-0 bg-gray-200 text-gray-500 px-4 py-2.5 rounded-full font-semibold text-sm cursor-not-allowed"
                >
                  Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
