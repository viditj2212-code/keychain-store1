'use client'

import Link from 'next/link'
import Button from '@/components/common/Button'
import { useState } from 'react'

/**
 * Hero section for homepage
 * Features call-to-action and hero image
 */
export default function Hero() {
  const [imageSrc, setImageSrc] = useState('https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1600&auto=format&fit=crop&q=80')
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    // Fallback to another high-res industrial image
    setImageSrc('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80')
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden mesh-gradient">
      <div className="container-custom w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Headline & Actions */}
          <div className="flex-1 space-y-12 animate-fade-in order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-xl shadow-gray-900/10">
              Serial No. 2026 / Release
            </div>

            <div className="space-y-8">
              <h1 className="font-space text-6xl md:text-8xl lg:text-[8.5rem] font-extrabold text-gray-900 leading-[0.85] tracking-tighter uppercase italic">
                Daily <br />
                <span className="text-gray-300">Carriers.</span>
              </h1>
              <p className="font-outfit text-lg md:text-2xl text-gray-400 font-bold uppercase tracking-widest max-w-lg leading-tight lg:mx-0 mx-auto italic">
                Precision-engineered accessories <br className="hidden md:block" />
                defined by absolute durability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
              <Link href="/products">
                <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[220px]">Initialise Collection</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[220px]">The Collective</Button>
              </Link>
            </div>

            {/* Micro Stats - Industrial Style */}
            <div className="flex items-center gap-12 pt-12 justify-center lg:justify-start border-t border-gray-100 mt-12">
              <div className="space-y-1">
                <p className="font-space text-3xl font-extrabold text-gray-900">0.001</p>
                <p className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tolerance (mm)</p>
              </div>
              <div className="space-y-1">
                <p className="font-space text-3xl font-extrabold text-gray-900">Grade 5</p>
                <p className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-widest">Titanium</p>
              </div>
            </div>
          </div>

          {/* Right: Immersive Keychain Visual */}
          <div className="flex-1 relative order-1 lg:order-2 w-full max-w-2xl mx-auto">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white border border-gray-100 group shadow-2xl shadow-gray-200/50">
              <img
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&auto=format&fit=crop&q=80"
                alt="Industrial Keychain Detail"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Technical Overlay */}
              <div className="absolute top-10 right-10 glass p-6 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest italic mb-1">Status</p>
                <p className="text-xl font-space font-extrabold text-gray-900">In Production</p>
              </div>
            </div>

            {/* Technical grid decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-50 -z-10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
