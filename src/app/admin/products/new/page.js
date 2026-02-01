'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import ImageUpload from '@/components/common/ImageUpload'
import { useNotification } from '@/contexts/NotificationContext'

/**
 * Create new product page
 */
export default function NewProductPage() {
  const { showToast } = useNotification()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    image: '',
    images: '',
    category: 'Minimalist',
    stock: '',
    isFeatured: false,
    isNew: false,
    features: '',
  })
  const [errors, setErrors] = useState({})
  const [imagePreviews, setImagePreviews] = useState([])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleImagesChange = (previews) => {
    setImagePreviews(previews)
    if (errors.image) {
      setErrors({ ...errors, image: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const token = localStorage.getItem('adminToken')

      // Create FormData
      const data = new FormData()
      data.append('name', formData.name)
      data.append('description', formData.description)
      data.append('price', formData.price)
      if (formData.salePrice) data.append('salePrice', formData.salePrice)

      // Append image files
      imagePreviews.forEach((preview) => {
        if (preview.file) {
          data.append('images', preview.file)
        }
      })

      // Append features array
      const featuresArray = formData.features ? formData.features.split('\n').filter(f => f.trim()) : []
      featuresArray.forEach(feat => data.append('features', feat))

      data.append('category', formData.category)
      data.append('stock', formData.stock)
      data.append('isFeatured', formData.isFeatured)
      data.append('isNew', formData.isNew)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // DO NOT SET THIS!
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      })

      const responseData = await response.json()

      if (!response.ok) {
        if (responseData.errors) {
          const errorObj = {}
          const errorMessages = []
          responseData.errors.forEach(err => {
            errorObj[err.field] = err.message
            errorMessages.push(`- ${err.message}`)
          })
          setErrors(errorObj)
          throw new Error('Validation failed:\n' + errorMessages.join('\n'))
        }
        throw new Error(responseData.message || 'Failed to create product')
      }

      showToast('Product created successfully!', 'success')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      showToast(error.message || 'Failed to create product', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">Create a new product listing</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>

          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="e.g., Minimalist Steel Keychain"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`input-field ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Describe your product..."
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Minimalist">Minimalist</option>
              <option value="Leather">Leather</option>
              <option value="Metal">Metal</option>
              <option value="Custom">Custom</option>
            </Input>

            <Input
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              error={errors.stock}
              required
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Regular Price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              required
              min="0"
              placeholder="0.00"
            />

            <Input
              label="Sale Price (Optional)"
              name="salePrice"
              type="number"
              step="0.01"
              value={formData.salePrice}
              onChange={handleChange}
              error={errors.salePrice}
              min="0"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Images</h2>

          <ImageUpload
            images={imagePreviews}
            onChange={handleImagesChange}
            maxImages={10}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Features</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Features (Optional)
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={4}
              className="input-field"
              placeholder="One feature per line&#10;Premium stainless steel&#10;Rust-resistant coating&#10;Compact design"
            />
            <p className="text-sm text-gray-600 mt-1">Enter one feature per line</p>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Status</h2>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Featured Product</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">New Arrival</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}
