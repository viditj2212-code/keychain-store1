'use client'

import Link from 'next/link'
import { useState } from 'react'

/**
 * Categories section - Occasion-based flower categories
 */
export default function Categories() {
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const categories = [
    {
      id: 'birthday',
      name: 'Birthday Blooms',
      description: 'Vibrant bouquets to celebrate another year',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&auto=format&fit=crop&q=80',
      href: '/products?occasion=birthday',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'anniversary',
      name: 'Anniversary Flowers',
      description: 'Romantic arrangements for your special day',
      image: 'https://images.unsplash.com/photo-1522057306606-df6c7820122e?w=600&auto=format&fit=crop&q=80',
      href: '/products?occasion=anniversary',
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'romantic',
      name: 'Romantic Roses',
      description: 'Classic elegance for your loved one',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      href: '/products?occasion=romantic',
      color: 'from-rose-500 to-red-600',
    },
    {
      id: 'sympathy',
      name: 'Sympathy & Condolence',
      description: 'Thoughtful tributes to honor memories',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=80',
      href: '/products?occasion=sympathy',
      color: 'from-white to-gray-100',
    },
    {
      id: 'celebration',
      name: 'Celebration Bouquets',
      description: 'Joyful arrangements for any milestone',
      image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&auto=format&fit=crop&q=80',
      href: '/products?occasion=celebration',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 'seasonal',
      name: 'Seasonal Collection',
      description: 'Fresh picks inspired by the season',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80',
      href: '/products?sort=seasonal',
      color: 'from-primary-400 to-primary-600',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by Occasion
          </h2>
          <p className="font-sans text-base md:text-lg text-gray-600">
            Find the perfect bouquet for every meaningful moment in life
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative block overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-primary-300 transition-all duration-500 hover:shadow-xl hover:shadow-primary-100/50 reveal-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Shop Now</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Occasion Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                <span className="text-xs font-semibold text-gray-700">
                  {category.name.split(' ')[0]}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
          >
            <span>View All Bouquets</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
