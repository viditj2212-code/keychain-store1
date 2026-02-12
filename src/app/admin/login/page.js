'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

/**
 * Admin login page
 */
export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Real API Login
      // Original API call (when backend is ready)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Check if user is admin
      if (data.data.user.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.')
      }

      // Store token and user data
      localStorage.setItem('adminToken', data.data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.data.user))

      // Redirect to dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sans italic tracking-tighter uppercase">KeyChain<span className="text-gray-300">.</span></h1>
          <p className="text-gray-400 font-sans font-semibold uppercase tracking-[0.4em] text-[10px] italic">Admin Dashboard</p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans uppercase italic tracking-tight">Sign In_</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/admin/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Back to store */}
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-primary-600">
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  )
}
