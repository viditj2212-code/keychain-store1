'use client'

import { useState } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { submitContactForm } from '@/lib/api'

/**
 * Contact page
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

  return (
    <div className="bg-white min-h-[95vh] relative overflow-hidden mesh-gradient">
      {/* Background technical grid decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none -z-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <div className="container-custom py-40">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
          {/* Left: Branding & Info */}
          <div className="space-y-16 animate-fade-in text-center lg:text-left">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-[9px] font-bold uppercase tracking-[0.45em] shadow-2xl shadow-gray-900/20 italic">
                Communications / Protocol
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold text-gray-900 leading-tight tracking-tighter uppercase italic">
                Initialise <br />
                <span className="text-gray-300">Contact.</span>
              </h1>
              <p className="font-sans text-base md:text-lg text-gray-400 font-medium uppercase tracking-widest leading-tight italic max-w-md mx-auto lg:mx-0">
                Whether you have a technical query or a bespoke request, our bureau is active and ready.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
              <div className="group space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:bg-black group-hover:shadow-gray-900/40">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] italic mb-1">Electronic Mail</h3>
                  <p className="font-display text-xl font-extrabold text-gray-900 uppercase italic tracking-tighter">support@collective.io</p>
                </div>
              </div>

              <div className="group space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:bg-black group-hover:shadow-gray-900/40">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] italic mb-1">Headquarters</h3>
                  <p className="font-display text-xl font-extrabold text-gray-900 uppercase italic tracking-tighter">Archive 1 / Lab 001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="staggered-revealer">
            <div className="bg-white/80 backdrop-blur-3xl p-12 md:p-16 rounded-[3.5rem] border border-white shadow-2xl shadow-gray-200/50 relative overflow-hidden group">
              {/* Technical Indicator */}
              <div className="absolute top-0 right-0 p-8">
                <div className="w-2 h-2 rounded-full bg-gray-900 animate-pulse"></div>
              </div>

              {submitted ? (
                <div className="py-20 text-center space-y-10 animate-fade-in">
                  <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-white mx-auto shadow-2xl shadow-gray-900/20">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-3xl font-extrabold text-gray-900 uppercase italic tracking-tighter">Packet Delivered</h3>
                    <p className="font-sans text-gray-400 font-bold uppercase tracking-widest leading-tight max-w-xs mx-auto italic">
                      Transmission received. Our bureau will respond within 24 standard hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-sans text-gray-900 font-bold text-xs uppercase tracking-widest hover:underline transition-all italic"
                  >
                    Initiate New Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">
                        Full Identifier
                      </label>
                      <input
                        name="name"
                        placeholder="ID"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-sans font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">
                        Comms Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="NAME@DOMAIN.COM"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-sans font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">
                      Subject Matter
                    </label>
                    <input
                      name="subject"
                      placeholder="CUSTOM_SPEC_001"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-sans font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">
                      Transmission Narrative
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="ENTER SPECIFICATIONS OR QUERIES..."
                      className="w-full rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 p-8 transition-all resize-none font-sans font-bold uppercase tracking-widest text-gray-900 text-xs leading-relaxed italic"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white h-20 rounded-[2rem] font-display font-extrabold text-[13px] uppercase tracking-[0.4em] italic flex items-center justify-center gap-6 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-30 shadow-2xl shadow-gray-900/20"
                  >
                    {loading ? (
                      'TRANSMITTING...'
                    ) : (
                      <>
                        Execute Transmission
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
