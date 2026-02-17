'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ImageUpload from '@/components/common/ImageUpload'
import Loading from '@/components/common/Loading'

/**
 * Admin edit product page - Flower Store
 */
export default function AdminEditProductPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sale_price: '',
    category: 'Birthday',
    stock_quantity: '',
    image: null,
    current_image_url: '',
  })

  const occasions = ['Birthday', 'Anniversary', 'Romantic', 'Sympathy', 'Celebration', 'Seasonal', 'Just Because']

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const product = data.data
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          sale_price: product.sale_price || '',
          category: product.category || 'Birthday',
          stock_quantity: product.stock_quantity || '',
          image: null,
          current_image_url: product.image_url || product.image || '',
        })
      }
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

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
    setSaving(true)

    try {
      const token = localStorage.getItem('adminToken')

      const data = new FormData()
      Object.keys(formData).forEach(key => {
        if (key !== 'current_image_url' && formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key])
        }
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      })

      if (response.ok) {
        router.push('/admin/products')
      } else {
        throw new Error('Failed to update bouquet')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update bouquet. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loading />
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
            Edit Bouquet
          </h1>
          <p className="text-gray-600 mt-1">Update bouquet details and availability</p>
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
            name="sale_price"
            value={formData.sale_price}
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
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            placeholder="20"
            required
          />

          <div className="md:col-span-2">
            <ImageUpload
              label="Bouquet Image"
              value={formData.image || formData.current_image_url}
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
            disabled={saving}
            className="flex-1"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
