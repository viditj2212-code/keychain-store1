'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import { getImageUrl } from '@/utils/imageUrl'
import { useNotification } from '@/contexts/NotificationContext'

/**
 * Detailed product view component
 */
export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const { showToast } = useNotification()

  // Ensure we have an array of images, falling back to the main image if secondary images are missing
  const images = (product.images && product.images.length > 0)
    ? product.images.map(img => getImageUrl(img))
    : [getImageUrl(product.image) || 'https://via.placeholder.com/600x600?text=Keychain']

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

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex flex-col xl:flex-row gap-20 items-start relative px-4 md:px-0">
      {/* Background technical grid decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none -z-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      {/* Left: Immersive Floating Gallery (60%) */}
      <div className="w-full xl:w-[60%] xl:sticky xl:top-24 space-y-8 animate-fade-in">
        <div className="relative group rounded-[3rem] overflow-hidden bg-gray-900 border border-gray-100 shadow-2xl transition-all duration-700">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />

          {/* Overlapping Info Badge - Industrial Noir style */}
          <div className="absolute bottom-10 left-10 z-10">
            <div className="glass p-8 rounded-[2.5rem] flex items-center gap-8">
              <div className="space-y-1">
                <p className="font-poppins text-[9px] font-semibold text-gray-400 uppercase tracking-[0.3em] italic">Current Spec</p>
                <h3 className="font-poppins text-2xl font-bold text-gray-900 uppercase italic tracking-tighter">{product.name}</h3>
              </div>
              <div className="w-px h-12 bg-gray-900/10"></div>
              <div className="space-y-1">
                <p className="font-poppins text-[9px] font-semibold text-gray-400 uppercase tracking-[0.3em] italic">Validation</p>
                <span className="font-poppins text-sm font-semibold text-gray-900 flex items-center gap-3 uppercase italic tracking-widest">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-900 animate-pulse"></span>
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-10 left-10 z-10 flex flex-col gap-4">
            {product.isNew && <Badge variant="primary" className="shadow-2xl px-6 py-2.5 font-poppins italic">N° SERIES-X</Badge>}
            {product.isFeatured && <Badge variant="secondary" className="shadow-2xl px-6 py-2.5 font-poppins italic">CORE-EDITION</Badge>}
          </div>
        </div>

        {/* Minimalist Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-32 h-32 rounded-[2rem] overflow-hidden border-2 transition-all duration-700 relative group ${selectedImage === index
                  ? 'border-gray-900 scale-95 shadow-2xl'
                  : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                  }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Technical Data Pillar (40%) */}
      <div className="w-full xl:w-[40%] space-y-16 py-10">
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <span className="font-poppins px-5 py-2 bg-gray-900 text-white text-[9px] font-semibold uppercase tracking-[0.4em] rounded-lg italic">
              Serial ID: {product.id.split('-')[0]}
            </span>
            <div className="h-0.5 flex-1 bg-gray-900/5"></div>
          </div>

          <h1 className="font-poppins text-5xl md:text-[6.5rem] font-bold text-gray-900 leading-[0.85] tracking-tighter uppercase italic">
            {product.name}
          </h1>

          <p className="font-poppins text-lg md:text-xl text-gray-400 font-semibold uppercase tracking-[0.2em] leading-tight max-w-xl italic">
            {product.description}
          </p>
        </div>

        {/* Dynamic Pricing Section */}
        <div className="space-y-10 pt-12 border-t border-gray-100">
          <div className="flex items-baseline gap-8">
            {product.salePrice ? (
              <>
                <span className="font-poppins text-7xl font-bold text-gray-900 tracking-tighter uppercase italic">${product.salePrice.toFixed(2)}</span>
                <span className="font-poppins text-3xl text-gray-200 line-through font-semibold tracking-tighter uppercase italic">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-poppins text-7xl font-bold text-gray-900 tracking-tighter uppercase italic">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-1 items-center bg-gray-50/50 rounded-[2rem] border border-gray-100 flex gap-6 pr-8 transition-all hover:bg-white hover:shadow-xl duration-500">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl shadow-xl flex items-center justify-center text-white font-poppins font-bold italic">
                STR
              </div>
              <div className="space-y-0.5">
                <p className="font-poppins text-[9px] font-semibold text-gray-400 uppercase tracking-[0.3em] italic">Strength</p>
                <p className="font-poppins text-sm font-semibold text-gray-900 uppercase tracking-widest italic">Industrial</p>
              </div>
            </div>
            <div className="p-1 items-center bg-gray-50/50 rounded-[2rem] border border-gray-100 flex gap-6 pr-8 transition-all hover:bg-white hover:shadow-xl duration-500">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl shadow-xl flex items-center justify-center text-white font-poppins font-bold italic">
                MAT
              </div>
              <div className="space-y-0.5">
                <p className="font-poppins text-[9px] font-semibold text-gray-400 uppercase tracking-[0.3em] italic">Material</p>
                <p className="font-poppins text-sm font-semibold text-gray-900 uppercase tracking-widest italic">Aerospace</p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Interface - High Density */}
        <div className="space-y-10 pt-12 border-t border-gray-100 mb-10">
          <div className="flex items-center justify-between">
            <span className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] italic">Quantity / Units</span>
            <div className="flex items-center gap-10 bg-gray-900 p-2 rounded-[1.8rem]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all active:scale-90"
              >
                -
              </button>
              <span className="font-poppins text-2xl font-bold text-white w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all active:scale-90"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="col-span-2 font-poppins bg-gray-900 text-white h-24 rounded-[2.5rem] font-bold text-[15px] uppercase tracking-[0.35em] italic flex items-center justify-center gap-6 hover:bg-black hover:shadow-2xl hover:shadow-gray-900/20 transition-all active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-300 shadow-2xl shadow-gray-200"
            >
              {product.stock === 0 ? 'Out of Inventory' : (
                <>
                  Add to Cart
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="font-poppins bg-white border-2 border-gray-900 text-gray-900 h-24 rounded-[2.5rem] font-bold text-[15px] uppercase tracking-[0.35em] italic flex items-center justify-center hover:bg-gray-900 hover:text-white hover:shadow-2xl hover:shadow-gray-900/20 transition-all active:scale-[0.98] shadow-lg"
              title="Share Product"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Feature List - Tactical Hardware style */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-8 pt-12">
            <h4 className="font-outfit text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] italic">— Tactical Specifications</h4>
            <div className="grid grid-cols-1 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="group flex items-center justify-between p-8 rounded-[1.8rem] bg-white border border-gray-100 hover:border-gray-900 transition-all duration-500">
                  <span className="font-poppins text-gray-900 font-semibold text-sm tracking-widest uppercase italic">{feature}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-900 scale-0 group-hover:scale-100 transition-transform"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
