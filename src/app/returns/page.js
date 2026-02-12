'use client'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-40 pb-32 overflow-hidden mesh-gradient">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div className="font-sans inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.45em] shadow-2xl shadow-gray-900/20 italic">
              Support / Returns / Policy
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tighter uppercase italic">
              Return <br />
              <span className="text-gray-300">Policy.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="container-custom pb-32">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="bg-white rounded-[3rem] border-2 border-gray-900 p-12 shadow-2xl">
            <h2 className="font-display text-3xl font-extrabold text-gray-900 uppercase italic tracking-tighter mb-8">
              Return Protocol
            </h2>
            <div className="space-y-6 font-sans text-gray-700">
              <p className="text-lg font-bold">We want you to love your keychain. If you're not satisfied, we offer a 30-day return policy.</p>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-gray-900 uppercase italic">Eligibility</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Items must be unused and in original condition</li>
                  <li>Original packaging must be included</li>
                  <li>Returns must be initiated within 30 days of delivery</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-gray-900 uppercase italic">Process</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Contact our support team to initiate a return</li>
                  <li>Receive your return authorization and shipping label</li>
                  <li>Pack the item securely and ship it back</li>
                  <li>Refund processed within 5-7 business days of receipt</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-gray-900 uppercase italic">Exceptions</h3>
                <p>Custom or personalized items cannot be returned unless defective.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
