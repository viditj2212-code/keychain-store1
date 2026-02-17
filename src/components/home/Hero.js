'use client'

import Link from 'next/link'
import Button from '@/components/common/Button'
import { useState, useEffect } from 'react'

/**
 * Hero section for homepage
 * Premium flower store with same-day delivery
 */
export default function Hero() {
  const [imageSrc, setImageSrc] = useState('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80')
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    // Fallback to another beautiful flower shop image
    setImageSrc('https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?w=1600&auto=format&fit=crop&q=80')
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  useEffect(() => {
    // Add reveal animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-gradient-to-b from-white to-primary-50/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-300/10 rounded-full blur-3xl animate-float"></div>

      <div className="container-custom w-full relative z-10 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left: Content */}
          <div className="flex-1 space-y-8 lg:space-y-10 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold shadow-sm reveal-on-scroll">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Same-Day Delivery Available
            </div>

            {/* Main Headline */}
            <div className="space-y-4 reveal-on-scroll">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Artisan Floral
                <br />
                <span className="text-primary-500">Arrangements</span>
              </h1>
              <p className="font-sans text-base md:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Handcrafted with the freshest blooms, delivered to your door with care. Creating beautiful moments, one bouquet at a time.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 reveal-on-scroll">
              <Link href="/products">
                <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Shop Bouquets
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Stats / Trust Indicators */}
            <div className="flex items-center gap-8 lg:gap-12 pt-8 justify-center lg:justify-start border-t border-gray-200 reveal-on-scroll">
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl lg:text-4xl font-bold text-gray-900">500+</p>
                <p className="font-sans text-xs lg:text-sm text-gray-500 font-medium mt-1">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl lg:text-4xl font-bold text-primary-600">7-Day</p>
                <p className="font-sans text-xs lg:text-sm text-gray-500 font-medium mt-1">Freshness Guarantee</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl lg:text-4xl font-bold text-gray-900">100%</p>
                <p className="font-sans text-xs lg:text-sm text-gray-500 font-medium mt-1">Satisfaction</p>
              </div>
            </div>

            {/* Additional Trust Element */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-gray-600 reveal-on-scroll">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Locally Sourced</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Expert Florists</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Eco-Friendly Packaging</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 order-1 lg:order-2 w-full">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/20 reveal-on-scroll">
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 animate-pulse"></div>
              )}

              {/* Main Hero Image */}
              <img
                src={imageSrc}
                alt="Beautiful fresh flower bouquets at Petal & Stem"
                onError={handleImageError}
                onLoad={handleImageLoad}
                className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-gray-900 text-sm">Order by 2 PM</p>
                    <p className="font-sans text-xs text-gray-600">for same-day delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
