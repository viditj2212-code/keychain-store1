'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductDetail from '@/components/products/ProductDetail'
import ProductCard from '@/components/products/ProductCard'
import Loading from '@/components/common/Loading'
import { fetchProduct, fetchProducts } from '@/lib/api'

/**
 * Individual product detail page
 */
export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProductData()
  }, [params.id])

  const loadProductData = async () => {
    try {
      setLoading(true)
      const data = await fetchProduct(params.id)
      setProduct(data)

      // Fetch related products (same category, excluding current product)
      const related = await fetchProducts({
        category: data.category,
        limit: 4
      })
      setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 3))
    } catch (err) {
      setError(err.message)
      console.error('Error loading product data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-20 min-h-screen">
        <Loading />
        <p className="text-center mt-8 font-black text-gray-400 uppercase tracking-widest text-xs">Assembling Details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 font-medium">The masterpiece you seek has moved beyond our current inventory.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Detail Section */}
      <div className="container-custom py-20">
        <ProductDetail product={product} />
      </div>

      {/* Explore More - High Density Section */}
      <section className="bg-gray-50 py-32 border-t border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
            <div className="space-y-4">
              <div className="font-sans inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-gray-900 text-[10px] font-semibold tracking-[0.25em] border border-gray-100 shadow-xl shadow-gray-100/50">
                Discovery
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 tracking-tighter leading-none">
                More to <span className="text-primary-600">Explore.</span>
              </h2>
            </div>
            <p className="font-sans text-gray-500 font-semibold max-w-xs leading-relaxed">
              Curated objects from the same collection that complement your current selection. Engineered for the same legacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 staggered-revealer">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))
            ) : (
              // Fallback if no related products
              <p className="font-sans text-gray-400 font-bold col-span-full py-12 text-center text-lg">
                Expanding the collection soon...
              </p>
            )}
          </div>

          <div className="mt-24 text-center">
            <a
              href="/products"
              className="font-sans inline-flex items-center gap-4 bg-gray-900 text-white px-12 py-5 rounded-[2.5rem] font-bold text-[11px] tracking-[0.2em] hover:bg-primary-600 transition-all shadow-2xl shadow-gray-200 active:scale-95 group"
            >
              Browse Full Catalog
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
