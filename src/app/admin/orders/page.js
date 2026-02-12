'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Loading from '@/components/common/Loading'
import Badge from '@/components/common/Badge'
import { useNotification } from '@/contexts/NotificationContext'

/**
 * Admin orders management page
 */
export default function AdminOrdersPage() {
  const { showToast, showConfirm } = useNotification()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')

      let url = `${process.env.NEXT_PUBLIC_API_URL}/orders?limit=100`
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setOrders(data.data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const handleStatusChange = async (orderId, newStatus) => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        loadOrders()
        showToast('Order status updated successfully!', 'success')
      } else {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      showToast('Failed to update order status', 'error')
    }
  }

  const handleDelete = async (orderId) => {
    const confirmed = await showConfirm({
      title: 'Delete Order',
      message: 'This will cancel and remove the order. Proceed?',
      confirmText: 'Delete',
      cancelText: 'Keep Order',
      type: 'danger'
    })

    if (!confirmed) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        showToast('Order cancelled and deleted', 'success')
        loadOrders()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      showToast('Failed to delete order', 'error')
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      processing: 'primary',
      shipped: 'secondary',
      delivered: 'success',
      cancelled: 'danger',
    }
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>
  }

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-sans">Orders</h1>
        <p className="text-gray-600 mt-2 font-sans">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order number, email, or name..."
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
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-600">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="font-medium text-primary-600 hover:text-primary-700">
                        {order.orderNumber}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.items?.length || 0} items
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-600">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        ${order.total?.toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-4 justify-end">
                        <Link href={`/admin/orders/${order.id}`}>
                          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                            View Details &rarr;
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm">
                          Delete
                        </button>
                      </div>
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
