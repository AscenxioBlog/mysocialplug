import React, { useState, useEffect } from 'react'
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaBox, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import apiService from '../../services/apiService'

function AdminOverview() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await apiService.getAdminDashboard()
      console.log('Dashboard Data:', response)
      setDashboardData(response)
    } catch (error) {
      setError('Failed to load dashboard data')
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchDashboardData} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Retry
        </button>
      </div>
    )
  }

  const stats = [
    { title: 'Total Users', value: dashboardData?.stats?.totalUsers || 0, change: '+12%', icon: <FaUsers />, color: 'blue' },
    { title: 'Total Orders', value: dashboardData?.stats?.totalOrders || 0, change: '+8%', icon: <FaShoppingCart />, color: 'green' },
    { title: 'Revenue', value: `₦${dashboardData?.stats?.totalRevenue?.toLocaleString() || 0}`, change: '+15%', icon: <FaMoneyBillWave />, color: 'purple' },
    { title: 'Total Logs', value: dashboardData?.stats?.totalLogs || 0, change: '+2', icon: <FaBox />, color: 'orange' }
  ]

  const recentOrders = dashboardData?.recentOrders || []
  const topUsers = [] // This would need to be calculated from user data

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  {stat.change.startsWith('+') ? (
                    <FaArrowUp className="text-green-500 text-sm mr-1" />
                  ) : (
                    <FaArrowDown className="text-red-500 text-sm mr-1" />
                  )}
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`text-${stat.color}-500 text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₦{order.amount}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    completed
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Users</h2>
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{user.spent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview