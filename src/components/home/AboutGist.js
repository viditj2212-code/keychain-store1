'use client'

import Link from 'next/link'
import Button from '@/components/common/Button'

/**
 * AboutGist component for homepage
 * Displays brand story and values for the flower shop
 */
export default function AboutGist() {
  return (
    <section className="bg-gradient-to-b from-white to-primary-50/30 overflow-hidden relative">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        {/* Left: Image Pillar */}
        <div className="lg:w-1/2 relative group overflow-hidden bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?w=1200&auto=format&fit=crop&q=80"
            className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110"
            alt="Fresh flowers being arranged by expert florists"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Floating Badge */}
          <div className="absolute inset-x-8 bottom-8 lg:inset-x-12 lg:bottom-12 z-20">
            <div className="bg-white/95 backdrop-blur-sm p-6 lg:p-8 rounded-2xl inline-block shadow-xl">
              <p className="font-display text-gray-900 text-2xl lg:text-3xl font-bold">Since 2020</p>
              <p className="font-sans text-gray-600 text-sm mt-1">Crafting Beauty Daily</p>
            </div>
          </div>
        </div>

        {/* Right: Story & Values Content */}
        <div className="lg:w-1/2 flex items-center bg-white relative">
          <div className="p-8 md:p-16 lg:p-20 space-y-10 lg:space-y-12 relative z-10 w-full">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18c-1.5 3-4 4.5-7 5m7-5c1.5 3 4 4.5 7 5M5 8c0 7 7 13 7 13s7-6 7-13" />
                </svg>
                Our Story
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Artisan Floristry,
                <br />
                <span className="text-primary-500">Blooming Fresh</span>
              </h2>
              <p className="font-sans text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg">
                We believe every bouquet tells a story. Our expert florists handcraft each arrangement with the freshest seasonal blooms, bringing nature's beauty into your most cherished moments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-display text-lg font-bold text-gray-900">Fresh Guarantee</h4>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Every stem is carefully selected and guaranteed fresh for 7 days or your money back.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-display text-lg font-bold text-gray-900">Same-Day Delivery</h4>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Order by 2 PM for same-day delivery. Perfect for last-minute surprises and celebrations.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/about">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
