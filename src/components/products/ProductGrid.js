import ProductCard from './ProductCard'

/**
 * Grid layout for displaying multiple products
 */
export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18m0-18c-1.5 3-4 4.5-7 5m7-5c1.5 3 4 4.5 7 5M5 8c0 7 7 13 7 13s7-6 7-13" />
          </svg>
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">No bouquets found</h3>
          <p className="text-gray-600">Try adjusting your filters or browse all our collections</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
