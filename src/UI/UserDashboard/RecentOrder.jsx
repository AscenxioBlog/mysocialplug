import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaCalendarAlt } from 'react-icons/fa'
import API_URL from '../../Config'

function RecentOrder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentOrders()
  }, [])

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/details`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      const data = await response.json()
      setOrders((data.orders || []).slice(0, 5))
    //   console.log('Recent orders fetched:', data)   
    } catch (error) {
    //   console.error('Error fetching orders:', error)
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
            <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaShoppingCart className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.userId?.userName || 'User'}</p>
                  <p className="text-sm text-gray-500">{order.logId?.logName || 'Product'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₦{order.amount}</p>
                <p className="text-xs text-green-600">Completed</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentOrder
