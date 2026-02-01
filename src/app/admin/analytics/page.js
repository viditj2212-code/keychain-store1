'use client'

import { useEffect, useState, useCallback } from 'react'
import Loading from '@/components/common/Loading'

/**
 * Admin analytics dashboard page
 */
export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30')

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics?days=${timeRange}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      setAnalytics(data.data)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  if (loading) {
    return <Loading />
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${analytics?.totalRevenue?.toFixed(2) || '0.00'}`,
      change: `+${analytics?.revenueChange?.toFixed(1) || '0'}% vs last period`,
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: analytics?.totalOrders || 0,
      change: `${analytics?.orderChange >= 0 ? '+' : ''}${analytics?.orderChange?.toFixed(1) || '0'}% vs last period`,
      positive: analytics?.orderChange >= 0,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      title: 'Average Order Value',
      value: `$${analytics?.averageOrderValue?.toFixed(2) || '0.00'}`,
      change: `${analytics?.aovChange >= 0 ? '+' : ''}${analytics?.aovChange?.toFixed(1) || '0'}% vs last period`,
      positive: analytics?.aovChange >= 0,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-purple-500',
    },
    {
      title: 'Conversion Rate',
      value: `${analytics?.conversionRate?.toFixed(2) || '0'}%`,
      change: `${analytics?.conversionChange >= 0 ? '+' : ''}${analytics?.conversionChange?.toFixed(2) || '0'}% vs last period`,
      positive: analytics?.conversionChange >= 0,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'bg-yellow-500',
    },
  ]

  const topProducts = analytics?.topProducts || []
  const topCategories = analytics?.topCategories || []

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Track your store's performance</p>
        </div>
        <div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                {card.icon}
              </div>
            </div>
            <p className={`text-sm font-medium ${
              card.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {card.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No product data available</p>
            ) : (
              topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <p className="font-semibold text-gray-900">${product.revenue?.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Categories</h2>
          <div className="space-y-3">
            {topCategories.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No category data available</p>
            ) : (
              topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-600">{category.orders} orders</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{
                          width: `${(category.percentage || 0) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 w-12">
                      {(category.percentage * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Customer insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
          <p className="text-sm text-orange-700 font-medium mb-2">New Customers</p>
          <p className="text-3xl font-bold text-orange-900">{analytics?.newCustomers || 0}</p>
          <p className="text-xs text-orange-600 mt-2">
            This period
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-6">
          <p className="text-sm text-indigo-700 font-medium mb-2">Repeat Customers</p>
          <p className="text-3xl font-bold text-indigo-900">{analytics?.repeatCustomers || 0}</p>
          <p className="text-xs text-indigo-600 mt-2">
            {analytics?.repeatRate?.toFixed(1) || '0'}% of total
          </p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-xl p-6">
          <p className="text-sm text-rose-700 font-medium mb-2">Cart Abandonment</p>
          <p className="text-3xl font-bold text-rose-900">{analytics?.cartAbandonmentRate?.toFixed(1) || '0'}%</p>
          <p className="text-xs text-rose-600 mt-2">
            {analytics?.abandonedCarts || 0} carts
          </p>
        </div>
      </div>

      {/* Additional metrics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Total Visits</p>
            <p className="text-2xl font-bold text-gray-900">{analytics?.totalVisits || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{analytics?.totalUsers || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Bounce Rate</p>
            <p className="text-2xl font-bold text-gray-900">{analytics?.bounceRate?.toFixed(1) || '0'}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Avg Session Duration</p>
            <p className="text-2xl font-bold text-gray-900">{analytics?.avgSessionDuration?.toFixed(0) || '0'}s</p>
          </div>
        </div>
      </div>
    </div>
  )
}
