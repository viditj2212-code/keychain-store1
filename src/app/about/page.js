import Link from 'next/link'

/**
 * Modern About page
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Heavy Technical Header */}
      <section className="relative py-40 bg-white overflow-hidden mesh-gradient">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.45em] shadow-2xl shadow-gray-900/20 italic">
              Terminal / Dossier / 001
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-gray-900 tracking-tighter uppercase italic leading-tight">
              The <br />
              <span className="text-gray-300">Collective.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-gray-400 leading-tight max-w-2xl mx-auto font-bold uppercase tracking-widest italic">
              Precision-engineered daily carries <br className="hidden md:block" />
              defined by absolute permanence.
            </p>
          </div>
        </div>
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </section>

      {/* The Origin / Foundation */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 relative group w-full">
              <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-gray-900 border border-gray-100 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&auto=format&fit=crop&q=80"
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  alt="Industrial Workshop"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-50 -z-10 rounded-full blur-3xl"></div>
            </div>
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.4em] italic leading-none">Foundation</div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tighter uppercase italic leading-tight">The Lab <br /> <span className="text-gray-300">Origin.</span></h2>
              <div className="space-y-6">
                <p className="font-sans text-lg text-gray-500 leading-tight font-bold uppercase tracking-widest italic">
                  Founded in 2024 as a response to the era of disposable objects. We operate out of a high-tolerance facility focused on serial production.
                </p>
                <p className="font-sans text-lg text-gray-400 leading-tight font-bold uppercase tracking-widest italic">
                  Every keychain we release is a prototype for the future—tested against extreme stress and designed for zero-tolerance utility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars / Tactical Specs */}
      <section className="py-40 bg-gray-50/50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-32 space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-xl shadow-gray-900/10">
              Department / Specs
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tighter uppercase italic">Engineering Ethics</h2>
            <p className="font-sans text-gray-400 max-w-xl mx-auto font-bold uppercase tracking-widest italic">The technical framework that defines every serial number in our archive.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Craftsmanship */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-[3rem] bg-white border border-gray-100 p-16 flex flex-col justify-end transition-all duration-700 hover:border-gray-900 hover:shadow-2xl hover:shadow-gray-200/50 min-h-[500px]">
              <div className="absolute top-16 left-16 w-12 h-px bg-gray-100 group-hover:bg-gray-900 transition-colors"></div>
              <div className="absolute top-12 left-16 w-px h-12 bg-gray-100 group-hover:bg-gray-900 transition-colors"></div>

              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 tracking-tighter uppercase italic leading-none">Atomic <br /> Integrity.</h3>
              <p className="font-sans text-gray-400 text-lg leading-tight max-w-md font-bold uppercase tracking-widest italic">
                Precision inspection at 50x magnification. We utilize aerospace-grade alloys and full-grain surfaces to ensure tactical permanence.
              </p>
            </div>

            {/* Sustainability / Lifecycle */}
            <div className="rounded-[3rem] bg-gray-900 p-16 text-white flex flex-col justify-between transition-all duration-700 hover:bg-black hover:shadow-2xl hover:shadow-gray-900/20 group">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white transition-all font-display font-extrabold text-white group-hover:text-gray-900 italic">
                ISO
              </div>
              <div className="space-y-6 mt-12">
                <h3 className="font-display text-3xl font-extrabold tracking-tighter uppercase italic leading-none">Endless <br /> Lifecycle.</h3>
                <p className="font-sans text-xs text-white/50 leading-relaxed font-bold uppercase tracking-[0.2em] italic">Zero-plastic archival packaging. Ethically sourced, industrially refined components.</p>
              </div>
            </div>

            {/* Lifetime Warranty / Guarantee */}
            <div className="rounded-[3rem] bg-white border border-gray-100 p-16 text-gray-900 flex flex-col justify-between transition-all duration-700 hover:border-gray-900 hover:shadow-2xl hover:shadow-gray-200/50 group">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 transition-all font-display font-extrabold group-hover:text-white italic">
                GUR
              </div>
              <div className="space-y-6 mt-12">
                <h3 className="font-display text-3xl font-extrabold tracking-tighter uppercase italic leading-none">Absolute <br /> Guarantee.</h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-[0.2em] italic">The Collective promise: built for the duration of the mission. We stand behind every serial ID.</p>
              </div>
            </div>

            {/* Design Language / Aesthetic */}
            <div className="md:col-span-2 rounded-[3rem] bg-white border-2 border-dashed border-gray-100 p-16 md:p-24 flex flex-col justify-end transition-all duration-700 hover:border-gray-900 hover:bg-gray-50/30 min-h-[500px]">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 tracking-tighter uppercase italic leading-tight">Hardware <br /> <span className="text-gray-300">Noir.</span></h3>
              <p className="font-sans text-gray-400 text-xl leading-tight max-w-lg font-bold uppercase tracking-widest italic">
                Simplicity through extreme engineering. Every curve and slot serves a distinct tactical function while maintaining a high-contrast silhouette.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </section>

      {/* CTA Section / Accessing Inventory */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="bg-gray-900 rounded-[3.5rem] p-20 md:p-40 text-center text-white relative overflow-hidden group shadow-2xl shadow-gray-900/20">
            <div className="relative z-10 space-y-12">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter uppercase italic leading-tight">Join The <br /> Collective.</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link href="/products">
                  <button className="bg-white text-gray-900 px-16 py-6 rounded-2xl font-display font-extrabold text-sm uppercase tracking-[0.4em] italic hover:bg-black hover:text-white transition-all active:scale-[0.95]">
                    Open Inventory
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="bg-transparent border-2 border-white text-white px-16 py-6 rounded-2xl font-display font-extrabold text-sm uppercase tracking-[0.4em] italic hover:bg-white hover:text-gray-900 transition-all active:scale-[0.95]">
                    Contact Bureau
                  </button>
                </Link>
              </div>
            </div>

            {/* Background Mesh Decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mesh-gradient"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          </div>
        </div>
      </section>
    </div>
  )
}
