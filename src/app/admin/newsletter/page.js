'use client'

import { useEffect, useState, useCallback } from 'react'
import Button from '@/components/common/Button'
import Loading from '@/components/common/Loading'
import Input from '@/components/common/Input'
import Badge from '@/components/common/Badge'
import { useNotification } from '@/contexts/NotificationContext'

/**
 * Admin newsletter subscribers page
 */
export default function AdminNewsletterPage() {
  const { showToast, showConfirm } = useNotification()
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [composing, setComposing] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadSubscribers()
  }, [])

  const loadSubscribers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/newsletter/subscribers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setSubscribers(data.data || [])
    } catch (error) {
      console.error('Error loading subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnsubscribe = async (subscriberId) => {
    const confirmed = await showConfirm({
      title: 'Unsubscribe Email',
      message: 'Are you sure you want to unsubscribe this email?',
      confirmText: 'Unsubscribe',
      cancelText: 'Cancel',
      type: 'warning'
    })

    if (!confirmed) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/newsletter/subscribers/${subscriberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      setSubscribers(subscribers.filter(s => s.id !== subscriberId))
      setMessage('Subscriber removed successfully')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error unsubscribing:', error)
      setMessage('Failed to remove subscriber')
    }
  }

  const handleSendNewsletter = async (e) => {
    e.preventDefault()
    setComposing(true)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/newsletter/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: formData.subject,
          content: formData.content,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send newsletter')
      }

      setMessage(`Newsletter sent to ${subscribers.length} subscribers successfully!`)
      setFormData({ subject: '', content: '' })
      setShowCompose(false)
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      console.error('Error sending newsletter:', error)
      setMessage(`Error: ${error.message}`)
    } finally {
      setComposing(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-600 mt-2">{subscribers.length} active subscribers</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowCompose(!showCompose)}
        >
          {showCompose ? '✕ Cancel' : '✉ Send Newsletter'}
        </Button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('Error')
            ? 'bg-red-50 border border-red-200 text-red-800'
            : 'bg-green-50 border border-green-200 text-green-800'
          }`}>
          {message}
        </div>
      )}

      {/* Compose section */}
      {showCompose && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Compose Newsletter</h2>
          <form onSubmit={handleSendNewsletter} className="space-y-4">
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Newsletter subject..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-600">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className="input-field"
                placeholder="Write your newsletter content here..."
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                This will be sent to {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                variant="primary"
                disabled={composing}
              >
                {composing ? 'Sending...' : 'Send Newsletter'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowCompose(false)}
                disabled={composing}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <p className="text-sm text-green-700 font-medium mb-2">Active Subscribers</p>
          <p className="text-3xl font-bold text-green-900">{subscribers.length}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
          <p className="text-sm text-blue-700 font-medium mb-2">This Month</p>
          <p className="text-3xl font-bold text-blue-900">
            {subscribers.filter(s => {
              const date = new Date(s.subscribedAt)
              const now = new Date()
              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
          <p className="text-sm text-purple-700 font-medium mb-2">Total Sent</p>
          <p className="text-3xl font-bold text-purple-900">0</p>
          <p className="text-xs text-purple-600 mt-1">Coming soon</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Subscribers
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by email..."
          className="input-field"
        />
      </div>

      {/* Subscribers list */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subscribed Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-600">
                    No subscribers found
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{subscriber.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleUnsubscribe(subscriber.id)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm hover:bg-red-50 px-3 py-1 rounded transition-colors"
                      >
                        Unsubscribe
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
