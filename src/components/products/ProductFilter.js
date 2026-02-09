import CustomDropdown from '@/components/common/CustomDropdown'

/**
 * Product filtering component
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
    { value: 'featured', label: 'Featured Choice' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'rating', label: 'Top Rated' },
  ]

  const priceRanges = [
    { value: 'all', label: 'All Price Ranges' },
    { value: '0-20', label: 'Entry Level (Under $20)' },
    { value: '20-50', label: 'Pro Gear ($20 - $50)' },
    { value: '50-100', label: 'Collector ($50 - $100)' },
    { value: '100+', label: 'Elite ($100+)' },
  ]

  return (
    <div className="bg-white rounded-[3rem] border-2 border-gray-900 p-10 space-y-12 shadow-2xl shadow-gray-200/50 relative overflow-hidden max-h-[80vh] overflow-y-auto">
      {/* Technical Grid Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '15px 15px' }}></div>

      <div className="space-y-4 relative z-10">
        <p className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em] italic">Refinement / Filter</p>
        <h3 className="font-space text-3xl font-extrabold text-gray-900 uppercase italic tracking-tighter leading-none">Control <br /><span className="text-gray-300">Bureau.</span></h3>
      </div>

      <div className="space-y-10 relative z-10">
        {/* Category Filter */}
        <CustomDropdown
          label="Archive Sector"
          options={categories}
          value={filters.category || 'All'}
          onChange={(val) => onFilterChange('category', val)}
        />

        {/* Price Range Filter */}
        <CustomDropdown
          label="Unit Value Matrix"
          options={priceRanges}
          value={filters.priceRange || 'all'}
          onChange={(val) => onFilterChange('priceRange', val)}
        />

        {/* Sort Filter */}
        <CustomDropdown
          label="Sequence Protocol"
          options={sortOptions}
          value={filters.sort || 'featured'}
          onChange={(val) => onFilterChange('sort', val)}
        />
      </div>

      {/* Active Parameters Summary */}
      <div className="pt-10 border-t-2 border-gray-900/5 relative z-10">
        <div className="flex flex-wrap gap-3">
          <div className="px-5 py-2 bg-gray-900 rounded-lg text-[9px] font-extrabold uppercase tracking-[0.3em] text-white italic shadow-lg shadow-gray-900/20">
            {filters.category !== 'All' ? filters.category : 'All Sectors'}
          </div>
          <div className="px-5 py-2 bg-white border-2 border-gray-900 rounded-lg text-[9px] font-extrabold uppercase tracking-[0.3em] text-gray-900 italic">
            {filters.sort.replace('-', ' ')}
          </div>
        </div>
      </div>
    </div>
  )
}
