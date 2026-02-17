'use client'

import { useState } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { submitContactForm } from '@/lib/api'

/**
 * Contact page - Flower store
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitContactForm(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const faqItems = [
    {
      question: 'What are your delivery hours?',
      answer: 'We deliver Monday-Saturday from 9 AM to 8 PM. Same-day delivery is available for orders placed before 2 PM.'
    },
    {
      question: 'How long will my bouquet stay fresh?',
      answer: 'With proper care, our bouquets stay fresh for 7-10 days. We provide care instructions with every order and guarantee freshness.'
    },
    {
      question: 'Can I customize a bouquet?',
      answer: 'Absolutely! Contact us with your preferences and our expert florists will create a custom arrangement just for you.'
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes! Orders placed before 2 PM qualify for same-day delivery within our delivery zone.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-primary-50/30 to-white overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              We're Here to
              <br />
              <span className="text-primary-500">Help</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Have a question about our bouquets, delivery, or custom arrangements?
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-200 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-500 mb-1 uppercase tracking-wide">Email Us</h3>
                    <p className="font-sans text-xl font-semibold text-gray-900">hello@petalstem.com</p>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-200 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-500 mb-1 uppercase tracking-wide">Call Us</h3>
                    <p className="font-sans text-xl font-semibold text-gray-900">(555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9 AM - 8 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-200 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-500 mb-1 uppercase tracking-wide">Visit Us</h3>
                    <p className="font-sans text-xl font-semibold text-gray-900">123 Bloom Street</p>
                    <p className="text-sm text-gray-500 mt-1">Garden City, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="pt-12 border-t border-gray-200">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details key={index} className="group bg-gray-50 rounded-xl p-6 hover:bg-primary-50/50 transition-all">
                    <summary className="font-display font-bold text-gray-900 cursor-pointer flex items-center justify-between gap-4">
                      {item.question}
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-10 shadow-xl">
              {submitted ? (
                <div className="py-16 text-center space-y-8 animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display text-3xl font-bold text-gray-900">Message Sent!</h3>
                    <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                      Send us a Message
                    </h3>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className="text-primary-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="input-field resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map / Location Section (Optional) */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50/20">
        <div className="container-custom">
          <div className="bg-gray-100 rounded-3xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center p-12">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-display text-xl font-bold text-gray-900 mb-2">Find Our Store</h4>
              <p className="text-gray-600">123 Bloom Street, Garden City, CA 90210</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
