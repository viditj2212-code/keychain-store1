import { useState, useCallback } from 'react'
import { fetchProducts } from '@/lib/api'

/**
 * Custom hook for fetching and managing products
 */
export function useProducts(initialFilters = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async (filters = initialFilters) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchProducts(filters)
      setProducts(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }, [initialFilters])

  return {
    products,
    loading,
    error,
    loadProducts,
  }
}
