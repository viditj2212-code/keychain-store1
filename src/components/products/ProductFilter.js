import CustomDropdown from '@/components/common/CustomDropdown'

/**
 * Product filtering component - Horizontal layout
 * Allows users to filter by category, price, and sort order
 */
export default function ProductFilter({ filters, onFilterChange }) {
  const categories = [
    { value: 'All', label: 'All Categories' },
    { value: 'Minimalist', label: 'Minimalist' },
    { value: 'Leather', label: 'Leather' },
    { value: 'Metal', label: 'Metal' },
    { value: 'Custom', label: 'Custom' },
  ]
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low-High' },
    { value: 'price-high', label: 'Price: High-Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Top Rated' },
  ]

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-20', label: 'Under $20' },
    { value: '20-50', label: '$20-$50' },
    { value: '50-100', label: '$50-$100' },
    { value: '100+', label: '$100+' },
  ]

  return (
    <div className="bg-white/95 rounded-[2rem] border border-gray-100 p-6 shadow-lg shadow-gray-200/50 mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Filter Header */}
        <div className="flex-shrink-0">
          <p className="font-poppins text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Filter Products</p>
        </div>

        {/* Filter Controls - Horizontal */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category Filter */}
          <CustomDropdown
            label="Category"
            options={categories}
            value={filters.category || 'All'}
            onChange={(val) => onFilterChange('category', val)}
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
        {(filters.category !== 'All' || filters.priceRange !== 'all' || filters.sort !== 'featured') && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {filters.category !== 'All' && (
                <span className="px-3 py-1 bg-gray-900 rounded-lg text-[9px] font-semibold uppercase tracking-wider text-white">
                  {filters.category}
                </span>
              )}
              {filters.priceRange !== 'all' && (
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-[9px] font-semibold uppercase tracking-wider text-gray-900">
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
