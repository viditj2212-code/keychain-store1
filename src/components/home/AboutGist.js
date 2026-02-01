'use client'

import Link from 'next/link'
import Button from '@/components/common/Button'

/**
 * AboutGist component for homepage
 * Displays a stylish card with a gist of the about section
 */
export default function AboutGist() {
  return (
    <section className="bg-white overflow-hidden relative">
      <div className="flex flex-col lg:flex-row min-h-[700px] border-y border-gray-100">
        {/* Left: Immersive Visual Pillar */}
        <div className="lg:w-1/2 relative group overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&auto=format&fit=crop&q=80"
            className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
            alt="Keychain Craftsmanship"
          />
          <div className="absolute inset-x-12 bottom-12 z-20">
            <div className="glass p-8 rounded-[2rem] inline-block">
              <p className="font-space text-gray-900 text-3xl font-extrabold tracking-tighter uppercase italic">Since 2024</p>
              <p className="font-outfit text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">The Collective / Lab</p>
            </div>
          </div>

          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        {/* Right: Story & Values Content */}
        <div className="lg:w-1/2 flex items-center bg-white relative">
          <div className="p-12 md:px-24 py-20 space-y-16 relative z-10 w-full">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-xl shadow-gray-900/10">
                Foundational / Vision
              </div>
              <h2 className="font-space text-4xl md:text-7xl font-extrabold text-gray-900 leading-[0.9] tracking-tighter uppercase italic">
                Daily <br />
                <span className="text-gray-300">Engineering.</span>
              </h2>
              <p className="font-outfit text-xl text-gray-500 font-bold uppercase tracking-widest leading-tight italic max-w-lg">
                We define the standard for daily carry. Every object is a testament to longevity, material science, and pure industrial intent.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
              <div className="space-y-4">
                <h4 className="font-space text-sm font-extrabold text-gray-900 uppercase tracking-widest italic">Atomic Integrity</h4>
                <p className="font-outfit text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed italic">Precision fits and industrial tolerances in every single component of our keychain systems.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-space text-sm font-extrabold text-gray-900 uppercase tracking-widest italic">Enduring Grade</h4>
                <p className="font-outfit text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed italic">Titanium and full-grain surfaces that age with character and survive the test of eternity.</p>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/about">
                <Button variant="outline" size="lg" className="min-w-[250px]">The Entire Dossier</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
