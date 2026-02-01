import { mockProducts } from './mockData'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const USE_MOCK_DATA = false // Set to false when backend is ready

/**
 * Generic API fetch wrapper
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    const body = await response.json()

    // If backend follows { success, message, data } shape, unwrap data
    if (body && typeof body === 'object' && body.success && Object.prototype.hasOwnProperty.call(body, 'data')) {
      return body.data
    }

    return body
  } catch (error) {
    console.error('API fetch error:', error)
    throw error
  }
}

/**
 * Fetch all products with optional filters
 */
export async function fetchProducts(filters = {}) {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredProducts = [...mockProducts]
    
    // Apply category filter
    if (filters.category && filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(
        p => p.category === filters.category
      )
    }
    
    // Apply price range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filteredProducts = filteredProducts.filter(p => {
        const price = p.salePrice || p.price
        if (max) {
          return price >= min && price <= max
        } else {
          return price >= min
        }
      })
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => 
          (a.salePrice || a.price) - (b.salePrice || b.price)
        )
        break
      case 'price-high':
        filteredProducts.sort((a, b) => 
          (b.salePrice || b.price) - (a.salePrice || a.price)
        )
        break
      case 'newest':
        filteredProducts.sort((a, b) => b.isNew - a.isNew)
        break
      case 'rating':
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // Featured first
        filteredProducts.sort((a, b) => b.isFeatured - a.isFeatured)
    }
    
    // Apply featured filter
    if (filters.featured) {
      filteredProducts = filteredProducts.filter(p => p.isFeatured)
    }
    
    // Apply limit
    if (filters.limit) {
      filteredProducts = filteredProducts.slice(0, filters.limit)
    }
    
    return filteredProducts
  }
  
  const params = new URLSearchParams()
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value)
  })
  
  const queryString = params.toString()
  const endpoint = `/products${queryString ? `?${queryString}` : ''}`
  
  return apiFetch(endpoint)
}

/**
 * Fetch single product by ID
 */
export async function fetchProduct(id) {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  }
  
  return apiFetch(`/products/${id}`)
}

/**
 * Create new order
 */
export async function createOrder(orderData) {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful order creation
    return {
      id: `ORDER-${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }
  
  return apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(email) {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true, email }
  }
  
  return apiFetch('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

/**
 * Submit contact form
 */
export async function submitContactForm(formData) {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log('Contact form submitted:', formData)
    return { success: true, message: 'Message received!' }
  }
  
  return apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
}