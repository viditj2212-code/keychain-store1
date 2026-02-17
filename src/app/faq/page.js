import Link from 'next/link'

/**
 * FAQ page - Flower Store
 */
export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Ordering & Delivery',
      questions: [
        {
          question: 'What are your delivery hours?',
          answer: 'We deliver Monday through Saturday from 9 AM to 8 PM. Sunday deliveries are available for special occasions with advance notice. Same-day delivery is available for orders placed before 2 PM.'
        },
        {
          question: 'Do you offer same-day delivery?',
          answer: 'Yes! Orders placed before 2 PM qualify for same-day delivery within our delivery zone. We recommend ordering early for guaranteed delivery, especially during peak seasons like Valentine\'s Day and Mother\'s Day.'
        },
        {
          question: 'How much does delivery cost?',
          answer: 'Standard delivery is $5.99. Orders over $50 qualify for free delivery. Same-day delivery may have additional fees depending on location and time of day.'
        },
        {
          question: 'Can I schedule a delivery for a specific date?',
          answer: 'Absolutely! During checkout, you can select your preferred delivery date. We recommend ordering at least 24 hours in advance for best availability.'
        },
        {
          question: 'What if no one is home during delivery?',
          answer: 'Our delivery team will make every effort to deliver your bouquet safely. If no one is available, we\'ll leave the flowers in a safe location or with a neighbor, and send a notification with delivery details.'
        }
      ]
    },
    {
      category: 'Flowers & Care',
      questions: [
        {
          question: 'How long will my bouquet stay fresh?',
          answer: 'With proper care, our bouquets stay fresh for 7-10 days. We provide detailed care instructions with every order. Key tips: change water every 2 days, trim stems at an angle, keep away from direct sunlight and heat.'
        },
        {
          question: 'What is your freshness guarantee?',
          answer: 'We guarantee all flowers to be fresh for at least 7 days from delivery. If your bouquet doesn\'t meet this standard, contact us within 48 hours of delivery for a free replacement or full refund.'
        },
        {
          question: 'Can I request specific flowers in my bouquet?',
          answer: 'While we craft each bouquet according to the design shown, seasonal availability may affect specific flowers. For custom requests, please contact us at least 48 hours in advance, and our florists will work to accommodate your preferences.'
        },
        {
          question: 'Are your flowers locally sourced?',
          answer: 'We source from both local growers and premium international suppliers to ensure year-round availability of the freshest, highest-quality blooms. We prioritize local and sustainable sources whenever possible.'
        },
        {
          question: 'Do you use eco-friendly packaging?',
          answer: 'Yes! We use recyclable and biodegradable materials for all our packaging. Our wrapping paper is made from recycled materials, and we avoid plastic whenever possible.'
        }
      ]
    },
    {
      category: 'Customization & Special Requests',
      questions: [
        {
          question: 'Can I add a personalized message?',
          answer: 'Yes! During checkout, you can include a personalized gift message (up to 200 characters). Our team will hand-write your message on a beautiful card to accompany your bouquet.'
        },
        {
          question: 'Do you offer custom bouquet designs?',
          answer: 'Absolutely! Contact us at least 48 hours in advance for custom designs. Our expert florists will work with you to create a unique arrangement based on your preferences, occasion, and budget.'
        },
        {
          question: 'Can I add chocolates, balloons, or other gifts?',
          answer: 'Currently, we specialize in flowers only to ensure the highest quality. However, we\'re working on adding complementary gift options. Sign up for our newsletter to be notified when this becomes available.'
        },
        {
          question: 'Do you handle wedding and event flowers?',
          answer: 'Yes! We offer comprehensive wedding and event floral services. Please contact us at least 2-3 months in advance for weddings. We\'ll schedule a consultation to discuss your vision, venue, and budget.'
        }
      ]
    },
    {
      category: 'Payment & Pricing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. All transactions are securely processed and encrypted.'
        },
        {
          question: 'Do you offer corporate accounts?',
          answer: 'Yes! We offer special pricing and billing for corporate clients. Contact us to set up a business account with flexible payment terms and dedicated account management.'
        },
        {
          question: 'Are prices the same for all occasions?',
          answer: 'Most of our bouquets have consistent pricing year-round. However, premium blooms for special occasions (Valentine\'s Day, Mother\'s Day) may have seasonal pricing due to high demand and limited availability.'
        }
      ]
    },
    {
      category: 'Issues & Support',
      questions: [
        {
          question: 'What if I\'m not satisfied with my order?',
          answer: 'Your satisfaction is our priority. If you\'re not completely happy with your bouquet, contact us within 48 hours of delivery. We\'ll work to make it right with a replacement, store credit, or full refund.'
        },
        {
          question: 'How do I track my order?',
          answer: 'You\'ll receive an email confirmation when your order is placed, and a delivery notification when your bouquet is on its way. You can also check your order status by logging into your account.'
        },
        {
          question: 'Can I cancel or modify my order?',
          answer: 'Orders can be cancelled or modified up to 4 hours before the scheduled delivery time. Contact us as soon as possible if you need to make changes. Same-day orders cannot be cancelled once processing begins.'
        },
        {
          question: 'How do I contact customer service?',
          answer: 'Reach us by email at hello@petalstem.com, call (555) 123-4567 (Mon-Sat 9 AM - 6 PM), or use our contact form. We typically respond within 2-4 hours during business hours.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-primary-50/30 to-white overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help Center
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Frequently Asked
              <br />
              <span className="text-primary-500">Questions</span>
            </h1>

            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              Everything you need to know about ordering beautiful bouquets from Petal & Stem
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b-2 border-primary-200">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/30">
                    {categoryIndex + 1}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => (
                    <details
                      key={questionIndex}
                      className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-primary-300 transition-all"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer">
                        <h3 className="font-display text-lg font-bold text-gray-900 pr-8">
                          {item.question}
                        </h3>
                        <svg
                          className="w-6 h-6 text-primary-600 flex-shrink-0 transform group-open:rotate-180 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
            <svg className="w-16 h-16 mx-auto mb-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h2 className="font-display text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-primary-50 text-lg mb-8">
              Our team is here to help! We typically respond within 2-4 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
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
