import React, { useState } from 'react'
import { FaSearch, FaEye, FaDownload, FaCheck, FaTimes } from 'react-icons/fa'

function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const orders = [
    {
      id: 'ORD-001',
      userId: 1,
      userName: 'John Doe',
      userEmail: 'john@example.com',
      product: 'Instagram Account',
      platform: 'Instagram',
      quantity: 2,
      amount: 70,
      status: 'completed',
      date: '2024-01-20',
      paymentMethod: 'wallet'
    },
    {
      id: 'ORD-002',
      userId: 2,
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      product: 'Facebook Account',
      platform: 'Facebook',
      quantity: 1,
      amount: 25,
      status: 'processing',
      date: '2024-01-19',
      paymentMethod: 'wallet'
    },
    {
      id: 'ORD-003',
      userId: 3,
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      product: 'TikTok Account',
      platform: 'TikTok',
      quantity: 3,
      amount: 150,
      status: 'pending',
      date: '2024-01-18',
      paymentMethod: 'wallet'
    }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const updateOrderStatus = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to ${newStatus}`)
    // Here you would update the order status in your backend
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="text-sm text-gray-600">
          {filteredOrders.length} orders found
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.userName}</p>
                      <p className="text-sm text-gray-500">{order.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.product}</p>
                      <p className="text-sm text-gray-500">{order.platform}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{order.quantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">₦{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="View Details">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Download">
                        <FaDownload />
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="text-green-600 hover:text-green-900 p-1" 
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900 p-1" 
                            title="Cancel"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {orders.filter(o => o.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₦{orders.reduce((sum, o) => sum + o.amount, 0)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderManagement