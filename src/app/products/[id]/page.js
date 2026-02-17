'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductDetail from '@/components/products/ProductDetail'
import ProductGrid from '@/components/products/ProductGrid'
import Loading from '@/components/common/Loading'
import { fetchProductById, fetchProducts } from '@/lib/api'

/**
 * Product detail page
 */
export default function ProductPage() {
  const params = useParams()
  const { id } = params
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      loadProductData()
    }
  }, [id])

  const loadProductData = async () => {
    setLoading(true)
    try {
      const productData = await fetchProductById(id)

      if (!productData) {
        setError('Product not found')
        return
      }

      setProduct(productData)

      // Load related products based on category/occasion
      const related = await fetchProducts({
        category: productData.category || productData.occasion,
        limit: 4,
        excludeId: productData.id
      })
      setRelatedProducts(related)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-20 min-h-[60vh]">
        <Loading />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container-custom py-20 text-center min-h-[60vh]">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the bouquet you're looking for.</p>
        <a href="/products" className="btn-primary inline-flex">Return to Shop</a>
      </div>
    )
  }

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50/30">
        <div className="container-custom py-4">
          <div className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-primary-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-primary-600">Shop</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <ProductDetail product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-100">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-10 text-center">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}
