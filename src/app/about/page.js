'use client'

import Link from 'next/link'
import Button from '@/components/common/Button'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-primary-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-primary-600 font-semibold text-sm mb-6 shadow-sm">
            Est. 2020
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Crafting Emotions Through <span className="text-primary-500">Nature's Beauty</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We are more than just a flower shop. We are storytellers, using stems and petals to help you express what words sometimes cannot.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop&q=80"
                  alt="Florist arranging flowers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gray-100 rounded-full -z-10"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 border-2 border-primary-200 rounded-full -z-10"></div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                From a Small Garden to Your Doorstep
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Petal & Stem began in a small backyard garden with a simple passion: to grow flowers that brought joy to our neighbors. What started as weekend bouquets at the local farmers market quickly blossomed into a mission to share nature's artistry with the entire city.
                </p>
                <p>
                  We believe that flowers are not just decorations; they are living art pieces that breathe life into spaces and celebrations. Every stem is hand-selected for its freshness, vibrancy, and unique character.
                </p>
                <p>
                  Today, we work with sustainable farms and local growers to ensure that every bouquet we deliver is as fresh as the moment it was cut. We're proud to be part of your most important moments—from weddings and anniversaries to simple gestures of kindness.
                </p>
              </div>

              <div className="pt-4">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-display text-4xl font-bold text-primary-500">5k+</p>
                    <p className="text-sm text-gray-500 font-medium">Bouquets Delivered</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-primary-500">98%</p>
                    <p className="text-sm text-gray-500 font-medium">5-Star Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600">
              The principles that guide every arrangement we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We prioritize eco-friendly practices, from sourcing locally grown blooms to using biodegradable packaging materials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Freshness First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We guarantee 7 days of freshness. Our streamlined supply chain means flowers spend less time in transit and more time blooming in your home.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Personal Touch</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every order is handled with care. We hand-write your gift messages and ensure every detail is perfect before delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 text-center">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Bring Beauty Into Your Life
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10 text-lg">
            Whether for a special occasion or just because, our bouquets are ready to make someone's day.
          </p>
          <Link href="/products">
            <Button size="lg" className="min-w-[200px]">
              Shop Collections
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
