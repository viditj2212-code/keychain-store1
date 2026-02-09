'use client'

import { useState } from 'react'
import { getImageUrl } from '@/utils/imageUrl'

/**
 * Image upload component with multiple file support and preview
 */
export default function ImageUpload({ images = [], onChange, maxImages = 10 }) {
  const [previews, setPreviews] = useState(images)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    if (files.length + previews.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`)
      return
    }

    // Create preview URLs
    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isNew: true
    }))

    const updatedPreviews = [...previews, ...newPreviews]
    setPreviews(updatedPreviews)

    // Pass files to parent
    if (onChange) {
      onChange(updatedPreviews)
    }
  }

  const handleRemove = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index)
    setPreviews(updatedPreviews)

    if (onChange) {
      onChange(updatedPreviews)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload button */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images {previews.length > 0 && `(${previews.length}/${maxImages})`}
        </label>
        <div className="flex items-center gap-4">
          <label className="btn-primary cursor-pointer inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={previews.length >= maxImages}
            />
          </label>
          <span className="text-sm text-gray-600">
            {previews.length === 0 ? 'No images selected' : `${previews.length} image${previews.length > 1 ? 's' : ''} selected`}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Upload up to {maxImages} images. First image will be the main product image.
        </p>
      </div>

      {/* Image previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                <img
                  src={getImageUrl(preview.url || preview)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main image badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Main
                </div>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                aria-label="Remove image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image number */}
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
