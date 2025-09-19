import React from 'react'
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaBox, FaArrowUp, FaArrowDown } from 'react-icons/fa'

function AdminOverview() {
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: <FaUsers />, color: 'blue' },
    { title: 'Total Orders', value: '856', change: '+8%', icon: <FaShoppingCart />, color: 'green' },
    { title: 'Revenue', value: '₦45,678', change: '+15%', icon: <FaMoneyBillWave />, color: 'purple' },
    { title: 'Products', value: '24', change: '+2', icon: <FaBox />, color: 'orange' }
  ]

  const recentOrders = [
    { id: 'ORD-001', user: 'John Doe', product: 'Instagram Account', amount: '₦35', status: 'completed' },
    { id: 'ORD-002', user: 'Jane Smith', product: 'Facebook Account', amount: '₦25', status: 'processing' },
    { id: 'ORD-003', user: 'Mike Johnson', product: 'TikTok Account', amount: '₦50', status: 'completed' },
    { id: 'ORD-004', user: 'Sarah Wilson', product: 'Twitter Account', amount: '₦20', status: 'pending' }
  ]

  const topUsers = [
    { name: 'John Doe', orders: 12, spent: '₦420' },
    { name: 'Jane Smith', orders: 8, spent: '₦280' },
    { name: 'Mike Johnson', orders: 6, spent: '₦210' },
    { name: 'Sarah Wilson', orders: 5, spent: '₦175' }
  ]

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
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.user} • {order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
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