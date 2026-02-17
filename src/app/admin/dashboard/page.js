'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/common/Loading'

/**
 * Admin dashboard home page - Flower Store
 * Shows overview statistics and recent activity
 */
export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken')

      // Fetch stats
      const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (statsRes.status === 401) {
        localStorage.removeItem('adminToken')
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }
        return
      }

      const statsData = await statsRes.json()
      setStats(statsData.data)

      // Fetch recent activities
      const activitiesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/activities/recent?limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (activitiesRes.status === 401) {
        return
      }

      const activitiesData = await activitiesRes.json()
      setActivities(activitiesData.data || [])
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '0.00'}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/analytics',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/orders',
    },
    {
      title: 'Total Bouquets',
      value: stats?.totalProducts || 0,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m0-18c-1.5 3-4 4.5-7 5m7-5c1.5 3 4 4.5 7 5M5 8c0 7 7 13 7 13s7-6 7-13" />
        </svg>
      ),
      color: 'from-primary-500 to-primary-600',
      textColor: 'text-primary-600',
      bgColor: 'bg-primary-50',
      link: '/admin/products',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      link: '/admin/orders?status=pending',
    },
  ]

  const alertCards = [
    {
      title: 'Low Stock Bouquets',
      value: stats?.lowStockProducts || 0,
      description: 'Need restocking',
      color: 'border-orange-200 bg-orange-50',
      textColor: 'text-orange-700',
      link: '/admin/products?filter=low-stock',
    },
    {
      title: 'Unread Messages',
      value: stats?.unreadMessages || 0,
      description: 'Customer inquiries',
      color: 'border-blue-200 bg-blue-50',
      textColor: 'text-blue-700',
      link: '/admin/messages',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your flower shop today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-300 transition-all hover:shadow-xl hover:shadow-primary-100/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${card.bgColor} rounded-xl ${card.textColor}`}>
                {card.icon}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="font-display text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Alert Cards */}
      {(stats?.lowStockProducts > 0 || stats?.unreadMessages > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alertCards.map((card, index) => (
            card.value > 0 && (
              <Link
                key={index}
                href={card.link}
                className={`p-6 rounded-2xl border-2 ${card.color} transition-all hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-semibold ${card.textColor} mb-1`}>{card.title}</p>
                    <p className="font-display text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                    <p className="text-xs text-gray-600">{card.description}</p>
                  </div>
                  <svg className={`w-8 h-8 ${card.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </Link>
            )
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Add New Bouquet</p>
              <p className="text-sm text-gray-500">Create product</p>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">View Orders</p>
              <p className="text-sm text-gray-500">Manage deliveries</p>
            </div>
          </Link>

          <Link
            href="/admin/messages"
            className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Customer Messages</p>
              <p className="text-sm text-gray-500">Reply to inquiries</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-gray-900">Recent Activity</h2>
          <Link href="/admin/analytics" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View All →
          </Link>
        </div>

        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{activity.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(activity.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  )
}
