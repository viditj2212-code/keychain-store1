'use client'

import { useEffect, useState, useCallback } from 'react'
import Loading from '@/components/common/Loading'
import Badge from '@/components/common/Badge'
import { useNotification } from '@/contexts/NotificationContext'

/**
 * Admin messages inbox page
 */
export default function AdminMessagesPage() {
  const { showToast, showConfirm } = useNotification()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')

      let url = `${process.env.NEXT_PUBLIC_API_URL}/contact?limit=100`
      if (statusFilter !== 'unread' && statusFilter !== 'read' && statusFilter !== 'all') {
        // Handle custom filters if needed
      } else if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setMessages(data.data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const handleMarkAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/${messageId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      })
      loadMessages()
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const handleDelete = async (messageId) => {
    const confirmed = await showConfirm({
      title: 'Delete Message',
      message: 'Are you sure you want to delete this message? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    })

    if (!confirmed) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      setMessages(messages.filter(m => m.id !== messageId))
      setSelectedMessage(null)
    } catch (error) {
      console.error('Error deleting message:', error)
      showToast('Failed to delete message', 'error')
    }
  }

  const filteredMessages = messages.filter(message =>
    (message.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.subject || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">{messages.length} total messages</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Messages
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or subject..."
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages list */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-gray-600">
            No messages found
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message)
                  if (message.status === 'unread') {
                    handleMarkAsRead(message.id)
                  }
                }}
                className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${message.status === 'unread'
                  ? 'border-l-primary-600 bg-primary-50'
                  : 'border-l-gray-200'
                  }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-semibold ${message.status === 'unread'
                        ? 'text-gray-900'
                        : 'text-gray-700'
                        }`}>
                        {message.name}
                      </h3>
                      {message.status === 'unread' && (
                        <Badge variant="primary">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{message.email}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-medium text-gray-900 mb-2">{message.subject}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{message.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message detail modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-semibold text-gray-900">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {selectedMessage.senderPhone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedMessage.senderPhone}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2">Message</p>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Message
                </button>
                <button
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessage.email}`
                  }}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}