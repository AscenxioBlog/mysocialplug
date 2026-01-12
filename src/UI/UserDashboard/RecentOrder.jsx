import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaCalendarAlt } from 'react-icons/fa'
import API_URL from '../../Config'

function RecentOrder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const getTimeAgo = (date) => {
    const now = new Date()
    const orderDate = new Date(date)
    const diffInMs = now - orderDate
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return orderDate.toLocaleDateString()
  }

  useEffect(() => {
    fetchRecentOrders()
  }, [])

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      const data = await response.json()
      setOrders((data.orders || data || []).slice(0, 5))
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent orders</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id || order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaShoppingCart className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.logName || order.productName || order.title || 'Product'}</p>
                  <p className="text-sm text-gray-500">Order #{order._id?.slice(-6) || order.id?.slice(-6) || 'N/A'}</p>
                  <p className="text-xs text-gray-400">
                    <FaCalendarAlt className="inline mr-1" />
                    {getTimeAgo(order.createdAt || order.orderDate)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₦{order.amount || order.price || order.total || '0'}</p>
                <p className="text-xs text-green-600">{order.status || 'Completed'}</p>
                {order.quantity && (
                  <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentOrder
