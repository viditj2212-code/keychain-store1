'use client'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-40 pb-32 overflow-hidden mesh-gradient">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div className="font-outfit inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.45em] shadow-2xl shadow-gray-900/20 italic">
              Legal / Terms / Agreement
            </div>

            <h1 className="font-space text-6xl md:text-[8rem] font-extrabold text-gray-900 leading-[0.8] tracking-tighter uppercase italic">
              Terms of <br />
              <span className="text-gray-300">Service.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="container-custom pb-32">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="bg-white rounded-[3rem] border-2 border-gray-900 p-12 shadow-2xl">
            <div className="space-y-8 font-outfit text-gray-700">
              <div>
                <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </div>

              <div>
                <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-4">
                  2. Use License
                </h2>
                <p>Permission is granted to temporarily download one copy of the materials on KeyChain Collective's website for personal, non-commercial transitory viewing only.</p>
              </div>

              <div>
                <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-4">
                  3. Product Information
                </h2>
                <p>We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
              </div>

              <div>
                <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-4">
                  4. Pricing
                </h2>
                <p>All prices are subject to change without notice. We reserve the right to modify or discontinue products without prior notice.</p>
              </div>

              <div>
                <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-4">
                  5. Limitation of Liability
                </h2>
                <p>KeyChain Collective shall not be liable for any damages arising out of the use or inability to use the materials on our website.</p>
              </div>

              <div className="pt-8 border-t-2 border-gray-900/10">
                <p className="text-sm text-gray-500">Last updated: February 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
