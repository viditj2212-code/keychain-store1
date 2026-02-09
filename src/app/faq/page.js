'use client'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-40 pb-32 overflow-hidden mesh-gradient">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div className="font-outfit inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.45em] shadow-2xl shadow-gray-900/20 italic">
              Support / FAQ / Database
            </div>

            <h1 className="font-space text-6xl md:text-[8rem] font-extrabold text-gray-900 leading-[0.8] tracking-tighter uppercase italic">
              Questions <br />
              <span className="text-gray-300">Answered.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="container-custom pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            {
              q: "What materials are your keychains made from?",
              a: "Our keychains are precision-engineered from premium materials including aerospace-grade aluminum, stainless steel, and genuine leather."
            },
            {
              q: "How long does shipping take?",
              a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for $15."
            },
            {
              q: "Do you offer international shipping?",
              a: "Yes, we ship worldwide. International orders typically arrive within 10-15 business days."
            },
            {
              q: "What is your return policy?",
              a: "We offer a 30-day return policy for unused items in original condition. See our Returns page for details."
            },
            {
              q: "Can I customize my keychain?",
              a: "Yes! Select products offer customization options including engraving and color choices."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-[2rem] border-2 border-gray-900/10 p-8 shadow-lg hover:border-gray-900 transition-all">
              <h3 className="font-space text-xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-4">
                {faq.q}
              </h3>
              <p className="font-outfit text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
