'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/products/ProductCard'
import ProductFilter from '@/components/products/ProductFilter'
import Loading from '@/components/common/Loading'
import { fetchProducts } from '@/lib/api'

/**
 * Products listing page
 */
export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'all',
    sort: 'featured',
    search: '',
  })

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts(filters)
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    // Use timeout to avoid too many requests? Or just set it. 
    // Usually debounce is better, but let's keep it simple for now as it's a small store.
    setFilters(prev => ({
      ...prev,
      search: value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Heavy Technical Header */}
      <section className="relative pt-40 pb-32 overflow-hidden mesh-gradient">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
            <div className="font-outfit inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.45em] shadow-2xl shadow-gray-900/20 italic">
              Terminal / Inventory / Release 2026
            </div>

            <h1 className="font-space text-6xl md:text-[11.5rem] font-extrabold text-gray-900 leading-[0.8] tracking-tighter uppercase italic">
              Tactical <br />
              <span className="text-gray-300">Hardware.</span>
            </h1>

            <p className="font-outfit text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-tight italic">
              Precision-engineered daily carriers <br className="hidden md:block" />
              constructed for absolute permanence.
            </p>

            {/* Tactical Search Interface */}
            <div className="relative max-w-3xl mx-auto group">
              <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] p-3 shadow-2xl shadow-gray-200/50 hover:border-gray-900 transition-all duration-700">
                <div className="pl-8 pr-4 text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="QUERY COLLECTION: MATERIAL, SERIES, SPEC..."
                  className="font-outfit flex-1 bg-transparent border-none focus:ring-0 text-gray-900 font-bold text-xs uppercase tracking-widest placeholder:text-gray-300 h-14"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
                <button className="font-space hidden md:flex ml-4 bg-gray-900 text-white px-12 py-5 rounded-[2rem] font-extrabold text-[12px] uppercase tracking-[0.3em] italic hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-900/10">
                  Execute
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </section>

      <div className="container-custom pb-32">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Tactical Filter Sidebar */}
          <aside className="w-full lg:w-80 lg:sticky lg:top-28 space-y-8 animate-fade-in">
            <div className="bg-gray-50/50 rounded-[3rem] p-2 border border-gray-100">
              <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Main Grid Section */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-48 grayscale opacity-50">
                <Loading />
                <p className="font-outfit mt-10 font-bold text-gray-400 uppercase tracking-[0.5em] text-[10px] italic">Accessing Archives...</p>
              </div>
            ) : products.length > 0 ? (
              <div className="staggered-revealer">
                <div className="flex items-center justify-between mb-16 pb-10 border-b-2 border-gray-900">
                  <div className="space-y-1">
                    <p className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] italic leading-none">Status / Inventory</p>
                    <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter">Indexed / {products.length} Units</h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    <div className="w-8 h-2 rounded-full bg-gray-100"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-12">
                  {products.map(product => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-48 text-center space-y-10 animate-fade-in border-2 border-dashed border-gray-100 rounded-[4rem]">
                <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto text-4xl text-white shadow-2xl">
                  !
                </div>
                <div className="space-y-4">
                  <h3 className="font-space text-3xl font-extrabold text-gray-900 uppercase italic tracking-tighter">Null Result</h3>
                  <p className="font-outfit text-gray-400 font-bold uppercase tracking-widest leading-tight max-w-xs mx-auto italic">No identifiers matched your current search parameters.</p>
                </div>
                <button
                  onClick={() => setFilters({ category: 'All', priceRange: 'all', sort: 'featured', search: '' })}
                  className="font-space bg-gray-900 text-white px-12 py-5 rounded-2xl font-extrabold text-[12px] uppercase tracking-[0.3em] italic hover:bg-black transition-all shadow-2xl shadow-gray-900/10"
                >
                  Reset Terminal
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
