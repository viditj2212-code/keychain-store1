import CustomDropdown from '@/components/common/CustomDropdown'

/**
 * Product filtering component
 * Allows users to filter by occasion, price, color, and sort order
 */
export default function ProductFilter({ filters, onFilterChange }) {
  const occasions = [
    { value: 'All', label: 'All Occasions' },
    { value: 'Birthday', label: 'Birthday' },
    { value: 'Anniversary', label: 'Anniversary' },
    { value: 'Romantic', label: 'Romantic' },
    { value: 'Sympathy', label: 'Sympathy' },
    { value: 'Celebration', label: 'Celebration' },
    { value: 'Just Because', label: 'Just Because' },
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
  ]

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-150', label: '$100 - $150' },
    { value: '150+', label: '$150+' },
  ]

  const flowerTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Roses', label: 'Roses' },
    { value: 'Lilies', label: 'Lilies' },
    { value: 'Tulips', label: 'Tulips' },
    { value: 'Orchids', label: 'Orchids' },
    { value: 'Mixed', label: 'Mixed Bouquets' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Filter Header */}
        <div className="flex-shrink-0">
          <h3 className="font-display text-lg font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Bouquets
          </h3>
        </div>

        {/* Filter Controls */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Occasion Filter */}
          <CustomDropdown
            label="Occasion"
            options={occasions}
            value={filters.category || 'All'}
            onChange={(val) => onFilterChange('category', val)}
          />

          {/* Flower Type Filter */}
          <CustomDropdown
            label="Flower Type"
            options={flowerTypes}
            value={filters.flowerType || 'all'}
            onChange={(val) => onFilterChange('flowerType', val)}
          />

          {/* Price Range Filter */}
          <CustomDropdown
            label="Price Range"
            options={priceRanges}
            value={filters.priceRange || 'all'}
            onChange={(val) => onFilterChange('priceRange', val)}
          />

          {/* Sort Filter */}
          <CustomDropdown
            label="Sort By"
            options={sortOptions}
            value={filters.sort || 'featured'}
            onChange={(val) => onFilterChange('sort', val)}
          />
        </div>

        {/* Active Filters Summary */}
        {(filters.category !== 'All' || filters.priceRange !== 'all' || filters.sort !== 'featured' || filters.flowerType !== 'all') && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {filters.category !== 'All' && (
                <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                  {filters.category}
                </span>
              )}
              {filters.flowerType !== 'all' && (
                <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                  {flowerTypes.find(t => t.value === filters.flowerType)?.label}
                </span>
              )}
              {filters.priceRange !== 'all' && (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                  {priceRanges.find(r => r.value === filters.priceRange)?.label}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
