'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ImageUpload from '@/components/common/ImageUpload'

/**
 * Admin new product page - Flower Store
 */
export default function AdminNewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: 'Birthday',
    stock: '',
    image: null,
  })

  const occasions = ['Birthday', 'Anniversary', 'Romantic', 'Sympathy', 'Celebration', 'Seasonal', 'Just Because']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (file) => {
    setFormData({
      ...formData,
      image: file,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')

      // Create FormData for file upload
      const data = new FormData()

      // Append basic fields
      data.append('name', formData.name)
      data.append('description', formData.description)
      data.append('price', formData.price)
      data.append('category', formData.category)
      data.append('stock', formData.stock)

      if (formData.salePrice) {
        data.append('salePrice', formData.salePrice)
      }

      if (formData.image) {
        // Backend expects 'images' (plural) as an array for the upload middleware
        data.append('images', formData.image)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      })

      if (response.ok) {
        router.push('/admin/products')
      } else {
        const errorData = await response.json()
        if (errorData.errors) {
          const errorMsg = errorData.errors.map(err => `${err.field}: ${err.message}`).join('\n')
          throw new Error(`Validation failed:\n${errorMsg}`)
        }
        throw new Error(errorData.message || 'Failed to create bouquet')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert(error.message || 'Failed to create bouquet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">
            Add New Bouquet
          </h1>
          <p className="text-gray-600 mt-1">Create a beautiful new flower arrangement</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Bouquet Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Romantic Rose Bouquet"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-primary-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe the bouquet, flowers included, and occasion..."
              required
            />
          </div>

          <Input
            label="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="49.99"
            step="0.01"
            required
          />

          <Input
            label="Sale Price (Optional)"
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            placeholder="39.99"
            step="0.01"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Occasion <span className="text-primary-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              {occasions.map(occasion => (
                <option key={occasion} value={occasion}>{occasion}</option>
              ))}
            </select>
          </div>

          <Input
            label="Stock Quantity"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="20"
            required
          />

          <div className="md:col-span-2">
            <ImageUpload
              label="Bouquet Image"
              value={formData.image}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Creating...' : 'Create Bouquet'}
          </Button>
        </div>
      </form>
    </div>
  )
}
