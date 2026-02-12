'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/common/Loading'

/**
 * Admin dashboard home page
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
        // Already handled above, but good for safety
        return
      }

      const activitiesData = await activitiesRes.json()
      setActivities(activitiesData.data || [])
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      if (!localStorage.getItem('adminToken')?.startsWith('mock-')) {
        setLoading(false)
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue || '0.00'}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
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
      color: 'bg-blue-500',
      link: '/admin/orders',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'bg-purple-500',
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
      color: 'bg-yellow-500',
      link: '/admin/orders?status=pending',
    },
  ]

  const alertCards = [
    {
      title: 'Low Stock Products',
      value: stats?.lowStockProducts || 0,
      description: 'Products with less than 10 items',
      color: 'bg-red-50 border-red-200 text-red-800',
      link: '/admin/products?filter=low-stock',
    },
    {
      title: 'New Messages',
      value: stats?.newMessages || 0,
      description: 'Unread contact messages',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      link: '/admin/messages?status=new',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats?.totalSubscribers || 0,
      description: 'Active subscribers',
      color: 'bg-green-50 border-green-200 text-green-800',
      link: '/admin/newsletter',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-sans">Dashboard</h1>
        <p className="text-gray-600 mt-2 font-sans">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 mr-4">
                  <p className="text-sm text-gray-600 mb-1 truncate">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 truncate" title={card.value}>
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg text-white flex-shrink-0`}>
                  {card.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alert cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alertCards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className={`border-2 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer ${card.color}`}>
              <p className="text-3xl font-bold mb-2">{card.value}</p>
              <p className="font-semibold mb-1">{card.title}</p>
              <p className="text-sm opacity-80">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activities */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-sans">Recent Activity</h2>
          <Link href="/admin/orders" className="text-sm text-primary-600 hover:text-primary-700 font-semibold font-sans">
            View all →
          </Link>
        </div>

        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg mr-4 ${activity.type === 'order' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                  {activity.type === 'order' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  activity.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                  {activity.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
