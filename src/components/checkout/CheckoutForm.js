'use client'

import { useState } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

/**
 * Checkout form component
 * Handles customer information and payment details
 */
export default function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',

    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',

    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'address', 'city', 'state', 'zipCode',
      'cardNumber', 'cardName', 'expiryDate', 'cvv'
    ]

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      {/* Contact Information / Identifier */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-px bg-gray-900"></div>
          <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter">Contact Index</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="NAME@DOMAIN.COM"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Phone Line</label>
            <input
              type="tel"
              name="phone"
              placeholder="+00 (000) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
            />
          </div>
        </div>
      </section>

      {/* Shipping Address / Tactical Coordinates */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-px bg-gray-900"></div>
          <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter">Tactical Coordinates</h2>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">First Name</label>
              <input
                name="firstName"
                placeholder="ID_01"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Last Name</label>
              <input
                name="lastName"
                placeholder="ID_02"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                required
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Address Matrix</label>
            <input
              name="address"
              placeholder="STREET, BUILDING, LAB"
              value={formData.address}
              onChange={handleChange}
              className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">City</label>
              <input
                name="city"
                placeholder="SECTOR"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">State</label>
              <input
                name="state"
                placeholder="PROVINCE"
                value={formData.state}
                onChange={handleChange}
                className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">ZIP Code</label>
              <input
                name="zipCode"
                placeholder="000000"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information / Acquisition Data */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-px bg-gray-900"></div>
          <h2 className="font-space text-2xl font-extrabold text-gray-900 uppercase italic tracking-tighter">Acquisition Data</h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Card Identifier</label>
            <input
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Cardholder Protocol</label>
            <input
              name="cardName"
              placeholder="FULL_NAME"
              value={formData.cardName}
              onChange={handleChange}
              className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Expiration</label>
              <input
                name="expiryDate"
                placeholder="MM / YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic ml-1">Security Code</label>
              <input
                name="cvv"
                placeholder="000"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full h-16 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-gray-900 px-8 transition-all font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Submit Button / Execution */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white h-20 rounded-[2.5rem] font-space font-extrabold text-[14px] uppercase tracking-[0.5em] italic flex items-center justify-center gap-6 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-30 shadow-2xl shadow-gray-900/20"
      >
        {loading ? (
          'EXECUTING...'
        ) : (
          <>
            Finalise Acquisition
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
