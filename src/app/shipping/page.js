'use client'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-40 pb-32 overflow-hidden mesh-gradient">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div className="font-sans inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.45em] shadow-2xl shadow-gray-900/20 italic">
              Support / Shipping / Protocol
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tighter uppercase italic">
              Shipping <br />
              <span className="text-gray-300">Info.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="container-custom pb-32">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="bg-white rounded-[3rem] border-2 border-gray-900 p-12 shadow-2xl">
            <h2 className="font-display text-3xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-8">
              Delivery Protocol
            </h2>
            <div className="space-y-6 font-sans text-gray-700">
              <p>We offer fast and reliable shipping to ensure your keychains arrive safely.</p>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-gray-900 uppercase italic">Standard Shipping</h3>
                <p>5-7 business days - FREE on orders over $50</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-gray-900 uppercase italic">Express Shipping</h3>
                <p>2-3 business days - $15</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-gray-900 uppercase italic">International</h3>
                <p>10-15 business days - Calculated at checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
