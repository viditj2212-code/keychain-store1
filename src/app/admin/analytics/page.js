'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/common/Loading'

/**
 * Admin analytics page - Flower Store
 */
export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7days')

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      setAnalytics(data.data || {})
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  const revenueData = analytics?.revenue || {}
  const topProducts = analytics?.topProducts || []
  const topCategories = analytics?.topCategories || []
  const customerStats = analytics?.customers || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
            Analytics & Insights
          </h1>
          <p className="text-gray-600">Track your flower shop performance</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('7days')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${timeRange === '7days' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${timeRange === '30days' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeRange('90days')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${timeRange === '90days' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-green-100">Total Revenue</p>
            <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-display text-4xl font-bold mb-2">
            ${revenueData.total?.toLocaleString() || '0'}
          </p>
          <div className="flex items-center gap-2 text-green-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold">+{revenueData.growth || 0}% vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Orders</p>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-gray-900 mb-2">
            {analytics?.totalOrders || 0}
          </p>
          <p className="text-sm text-gray-600">Average: ${(revenueData.total / (analytics?.totalOrders || 1)).toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Customers</p>
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-gray-900 mb-2">
            {customerStats.total || 0}
          </p>
          <p className="text-sm text-gray-600">{customerStats.new || 0} new customers</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-gray-900 mb-2">
            {analytics?.conversionRate || 0}%
          </p>
          <p className="text-sm text-gray-600">Site visitors to buyers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Bouquets */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6">
            Top Selling Bouquets
          </h2>
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&auto=format&fit=crop&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${product.revenue?.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No sales data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6">
            Popular Occasions
          </h2>
          <div className="space-y-4">
            {topCategories.length > 0 ? (
              topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{category.orders} orders</span>
                    <span>${category.revenue?.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No category data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="bg-gradient-to-br from-dark-950 to-dark-900 rounded-2xl p-8 text-white">
        <h2 className="font-display text-2xl font-bold mb-6">Customer Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <p className="text-sm text-gray-400 mb-2">Average Order Value</p>
            <p className="font-display text-3xl font-bold mb-2">
              ${customerStats.avgOrderValue?.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-primary-400">Per customer transaction</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <p className="text-sm text-gray-400 mb-2">Repeat Customer Rate</p>
            <p className="font-display text-3xl font-bold mb-2">
              {customerStats.repeatRate || 0}%
            </p>
            <p className="text-sm text-primary-400">Return for more bouquets</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <p className="text-sm text-gray-400 mb-2">Customer Lifetime Value</p>
            <p className="font-display text-3xl font-bold mb-2">
              ${customerStats.lifetimeValue?.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-primary-400">Average per customer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
