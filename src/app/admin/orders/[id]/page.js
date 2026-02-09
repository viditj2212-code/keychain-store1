'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/components/common/Loading'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import { useNotification } from '@/contexts/NotificationContext'
import { getImageUrl } from '@/utils/imageUrl'

/**
 * Order details page
 */
export default function OrderDetailPage() {
  const { showToast, showConfirm } = useNotification()
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [params.id])

  const loadOrder = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (data.success) {
        setOrder(data.data)
      } else {
        throw new Error('Order not found')
      }
    } catch (error) {
      console.error('Error loading order:', error)
      showToast('Failed to load order', 'error')
      router.push('/admin/orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    const confirmed = await showConfirm({
      title: 'Update Order Status',
      message: `Change order status to "${newStatus}"?`,
      confirmText: 'Update',
      cancelText: 'Cancel',
      type: 'info'
    })

    if (!confirmed) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        loadOrder()
        showToast('Order status updated successfully!', 'success')
      } else {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      showToast('Failed to update order status', 'error')
    }
  }

  const handleDelete = async () => {
    const confirmed = await showConfirm({
      title: 'Delete Order',
      message: 'This will permanently delete this order. This action cannot be undone.',
      confirmText: 'Delete Order',
      cancelText: 'Cancel',
      type: 'danger'
    })

    if (!confirmed) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        showToast('Order deleted successfully', 'success')
        router.push('/admin/orders')
      } else {
        throw new Error('Failed to delete order')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      showToast('Failed to delete order', 'error')
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Order not found</p>
      </div>
    )
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-2 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Order {order.orderNumber}</h1>
          <p className="text-gray-600 mt-1">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order items */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ${(item.salePrice || item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900">
                    ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="text-gray-700">
              <p className="font-medium">{order.customerName}</p>
              <p className="mt-2">{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </p>
              <p>{order.shippingAddress?.country || 'United States'}</p>
              <p className="mt-4 text-sm">
                <span className="font-medium">Email:</span> {order.customerEmail}
              </p>
              {order.customerPhone && (
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {order.customerPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>
            <div className="space-y-2">
              <Button
                onClick={() => handleStatusChange('processing')}
                variant="primary"
                className="w-full"
                disabled={order.status === 'processing'}
              >
                Mark as Processing
              </Button>
              <Button
                onClick={() => handleStatusChange('shipped')}
                variant="primary"
                className="w-full"
                disabled={order.status === 'shipped'}
              >
                Mark as Shipped
              </Button>
              <Button
                onClick={() => handleStatusChange('delivered')}
                variant="primary"
                className="w-full"
                disabled={order.status === 'delivered'}
              >
                Mark as Delivered
              </Button>
              <Button
                onClick={() => handleStatusChange('cancelled')}
                variant="danger"
                className="w-full"
                disabled={order.status === 'cancelled'}
              >
                Cancel Order
              </Button>
              <Button
                onClick={handleDelete}
                variant="danger"
                className="w-full mt-4"
              >
                Delete Order
              </Button>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping?.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${order.tax?.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
