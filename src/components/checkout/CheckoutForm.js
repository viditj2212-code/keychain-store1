'use client'

import { useState } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

/**
 * Checkout form component
 * Handles customer information and payment details
 * Flower store with delivery date and gift message
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

    // Flower Store Specific
    deliveryDate: '',
    deliveryTime: 'anytime',
    giftMessage: '',
    recipientPhone: '',

    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Get tomorrow's date as minimum delivery date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

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
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Contact Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-primary-700">1</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900">Contact Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="(555) 123-4567"
          />
        </div>
      </section>

      {/* Delivery Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-primary-700">2</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900">Delivery Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="John"
            required
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Doe"
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Delivery Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              placeholder="123 Main Street"
              required
            />
          </div>
          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            placeholder="New York"
            required
          />
          <Input
            label="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            placeholder="NY"
            required
          />
          <Input
            label="ZIP Code"
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            placeholder="10001"
            required
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivery Date (Optional)
            </label>
            <input
              type="date"
              name="deliveryDate"
              min={minDate}
              value={formData.deliveryDate}
              onChange={handleChange}
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">Order by 2 PM for same-day delivery</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Delivery Time
            </label>
            <select
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              className="input-field"
            >
              <option value="anytime">Anytime</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 8 PM)</option>
            </select>
          </div>
          <Input
            label="Recipient Phone (Optional)"
            type="tel"
            name="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleChange}
            placeholder="For delivery coordination"
          />
        </div>
      </section>

      {/* Gift Message */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900">Add a Gift Message</h2>
        </div>
        <div className="pl-11">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Personal Message (Optional)
          </label>
          <textarea
            name="giftMessage"
            rows="4"
            value={formData.giftMessage}
            onChange={handleChange}
            placeholder="Write a heartfelt message to include with your bouquet..."
            className="input-field resize-none"
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.giftMessage.length}/200 characters</p>
        </div>
      </section>

      {/* Payment Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-primary-700">3</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900">Payment Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
          <div className="md:col-span-2">
            <Input
              label="Card Number"
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Cardholder Name"
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              error={errors.cardName}
              placeholder="John Doe"
              required
            />
          </div>
          <Input
            label="Expiry Date"
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            error={errors.expiryDate}
            placeholder="MM/YY"
            required
          />
          <Input
            label="CVV"
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            error={errors.cvv}
            placeholder="123"
            required
          />
        </div>
      </section>

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full h-16 text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Complete Order
            </span>
          )}
        </Button>
        <p className="text-xs text-gray-500 text-center mt-4">
          Your payment information is secure and encrypted
        </p>
      </div>
    </form>
  )
}
