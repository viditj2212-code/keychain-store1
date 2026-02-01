'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import Loading from '@/components/common/Loading'
import Button from '@/components/common/Button'
import { fetchProducts } from '@/lib/api'

/**
 * Featured products section on homepage
 * Displays top 4 featured products
 */
export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts({ featured: true, limit: 4 })
      setProducts(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading featured products:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <Loading />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <p className="text-red-600">Failed to load products. Please try again later.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        {/* Modern Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
          <div className="space-y-6 animate-fade-in text-center md:text-left w-full md:w-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 text-gray-400 text-[10px] font-medium uppercase tracking-widest border border-gray-100">
              Curated Selection
            </div>
            <h2 className="font-poppins text-4xl md:text-6xl font-semibold text-gray-900 tracking-tight leading-tight">
              Featured <span className="text-gray-400">Essentials.</span>
            </h2>
          </div>
          <p className="text-gray-500 font-medium max-w-sm leading-relaxed text-center md:text-right">
            Handpicked favorites that represent the absolute pinnacle of minimalist design and engineering.
          </p>
        </div>

        {/* High-End Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 staggered-revealer">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-24 text-center">
          <Link href="/products">
            <Button variant="secondary" size="lg">Explore Entire Collection</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
