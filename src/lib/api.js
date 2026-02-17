import { supabase } from './supabase'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Mock data kept for reference/fallback if needed
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Blushing Beauty',
    description: 'A romantic arrangement of soft pink roses and white lilies, perfect for expressing admiration. Wrapped in premium kraft paper with a satin ribbon.',
    price: 89.99,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop&q=80',
    category: 'Romantic',
    occasion: 'Anniversary',
    stock: 12,
    isFeatured: true,
    features: ['12 Pink Roses', '3 White Lilies', 'Eucalyptus Greens', 'Hand-tied Bouquet'],
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582794543139-8ac92a9abf39?w=800&auto=format&fit=crop&q=80',
    ]
  },
  // ... other mock products would go here
]

/**
 * Maps Supabase product record (snake_case) to app product object (camelCase)
 */
const mapProduct = (p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: Number(p.price),
  salePrice: p.sale_price ? Number(p.sale_price) : null,
  image: p.image || p.image_url,
  category: p.category,
  occasion: p.occasion,
  stock: p.stock || p.stock_quantity,
  isFeatured: p.is_featured,
  isNew: p.is_new,
  features: p.features || [],
  images: p.images || []
})

export async function fetchProducts(filters = {}) {
  try {
    // Fetch all products from Supabase
    // We fetch all because the dataset is small and we want to reuse 
    // the complex JS filtering logic (search, price ranges, effective price sorting)
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    if (!data || data.length === 0) {
      console.warn('No products found in Supabase')
      return []
    }

    // DEBUG: Log first product to check fields
    // console.log('Raw Supabase Product:', data[0])

    // Map to app format
    let filtered = data.map(mapProduct)

    // Apply Filters (Same logic as before)

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p =>
        p.category === filters.category || p.occasion === filters.category
      )
    }

    // Flower type filtering
    if (filters.flowerType && filters.flowerType !== 'all') {
      filtered = filtered.filter(p => {
        // Check if product features contain the flower type
        const features = p.features?.join(' ').toLowerCase() || ''
        const name = p.name.toLowerCase()
        const description = p.description.toLowerCase()
        const searchTerm = filters.flowerType.toLowerCase()

        return features.includes(searchTerm) || name.includes(searchTerm) || description.includes(searchTerm)
      })
    }

    // Price range filtering
    if (filters.priceRange && filters.priceRange !== 'all') {
      filtered = filtered.filter(p => {
        const price = p.salePrice || p.price

        if (filters.priceRange === '0-50') {
          return price < 50
        } else if (filters.priceRange === '50-100') {
          return price >= 50 && price <= 100
        } else if (filters.priceRange === '100-150') {
          return price >= 100 && price <= 150
        } else if (filters.priceRange === '150+') {
          return price >= 150
        }
        return true
      })
    }

    if (filters.featured) {
      filtered = filtered.filter(p => p.isFeatured)
    }

    if (filters.excludeId) {
      filtered = filtered.filter(p => p.id !== filters.excludeId)
    }

    // Sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'price-low':
          // console.log('Sorting price-low')
          filtered.sort((a, b) => {
            const priceA = Number(a.salePrice) || Number(a.price)
            const priceB = Number(b.salePrice) || Number(b.price)
            return priceA - priceB
          })
          break
        case 'price-high':
          filtered.sort((a, b) => {
            const priceA = Number(a.salePrice) || Number(a.price)
            const priceB = Number(b.salePrice) || Number(b.price)
            return priceB - priceA
          })
          break
        case 'newest':
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
          break
        case 'popular':
          filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
          break
        case 'featured':
        default:
          // Featured items first, then by price
          filtered.sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1
            if (!a.isFeatured && b.isFeatured) return 1
            const priceA = Number(a.salePrice) || Number(a.price)
            const priceB = Number(b.salePrice) || Number(b.price)
            return priceA - priceB
          })
          break
      }
    }

    // Limit (apply last)
    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit)
    }

    return filtered

  } catch (err) {
    console.error('Unexpected error in fetchProducts:', err)
    return []
  }
}

export async function fetchProductById(id) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      // console.error(`Error fetching product ${id}:`, error)
      return null
    }

    return mapProduct(data)
  } catch (err) {
    console.error(`Unexpected error fetching product ${id}:`, err)
    return null
  }
}

export async function submitContactForm(formData) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to submit contact form')
  }

  return response.json()
}