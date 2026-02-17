'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilter from '@/components/products/ProductFilter'
import Loading from '@/components/common/Loading'
import { fetchProducts } from '@/lib/api'

/**
 * Product listing logic that uses searchParams
 */
function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || searchParams.get('occasion') || 'All',
    priceRange: 'all',
    sort: searchParams.get('sort') || 'featured',
    flowerType: 'all',
  })

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await fetchProducts(filters)
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-12 lg:py-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop Bouquets
          </h1>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto text-lg hover:text-gray-800 transition-colors">
            Explore our handcrafted arrangements for every occasion
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <ProductFilter filters={filters} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="py-20">
            <Loading />
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <ProductGrid products={products} />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Main Shop page component with Suspense boundary
 */
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="py-20 min-h-screen bg-gray-50/50">
        <Loading />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}

