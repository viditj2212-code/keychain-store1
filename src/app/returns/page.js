'use client'

import Link from 'next/link'

/**
 * Return Policy page - Flower Store
 */
export default function ReturnsPage() {
  const policyItems = [
    {
      title: 'Freshness Guarantee',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: 'We guarantee all flowers to be fresh for at least 7 days from delivery. If your bouquet doesn\'t meet this standard, contact us within 48 hours of delivery for a free replacement or full refund.'
    },
    {
      title: 'Eligibility Requirements',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      content: 'Returns are accepted within 7 days of delivery. Flowers must show clear signs of premature wilting or damage. Please take photos as evidence when contacting our support team.'
    },
    {
      title: 'Return Process',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      steps: [
        'Contact us within 48 hours of delivery via email or phone',
        'Provide your order number and photos of the flowers',
        'Our team will review your request within 24 hours',
        'Choose between a replacement bouquet or full refund',
        'Replacement orders are processed immediately'
      ]
    },
    {
      title: 'Refund Timeline',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: 'Approved refunds are processed within 5-7 business days. The refund will be credited to your original payment method. Replacement bouquets are delivered within 24-48 hours.'
    }
  ]

  const exceptions = [
    'Custom or personalized bouquets cannot be returned unless they arrive damaged or wilted',
    'Seasonal availability may result in similar flower substitutions, which are not eligible for returns',
    'Delivery delays due to recipient unavailability are not covered under our return policy',
    'Returns requested after 7 days from delivery will not be accepted'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-primary-50/30 to-white overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Customer Satisfaction
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Return
              <br />
              <span className="text-primary-500">Policy</span>
            </h1>

            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              Your satisfaction is our priority. We stand behind the quality and freshness of every bouquet.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="space-y-8">
            {policyItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-primary-300 transition-all hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h2>
                    {item.content && (
                      <p className="text-gray-600 leading-relaxed">
                        {item.content}
                      </p>
                    )}
                    {item.steps && (
                      <ol className="space-y-3 mt-4">
                        {item.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-600 leading-relaxed pt-0.5">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Exceptions */}
          <div className="mt-12 bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Exceptions
            </h3>
            <ul className="space-y-3">
              {exceptions.map((exception, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{exception}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
            <svg className="w-16 h-16 mx-auto mb-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className="font-display text-3xl font-bold mb-4">
              Need Help with a Return?
            </h2>
            <p className="text-primary-50 text-lg mb-8">
              Our customer service team is here to assist you. We typically respond within 2-4 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </Link>

              <a
                href="tel:5551234567"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
