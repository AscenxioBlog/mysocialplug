import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaCalendarAlt, FaCheckCircle, FaEye, FaEyeSlash, FaCopy, FaCheck } from 'react-icons/fa'
import apiService from '../../services/apiService'
import RecentOrder from './RecentOrder'

function Order() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [showPasswords, setShowPasswords] = useState({})
  const [copiedField, setCopiedField] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await apiService.getOrders()
      // console.log('API Response:', response)
      const apiOrders = response.orders || response || []
      
      // Get stored credentials from localStorage
      const storedCredentials = JSON.parse(localStorage.getItem('orderCredentials') || '{}')
      
      // Merge API orders with stored credentials
      const ordersWithCredentials = apiOrders.map(order => {
        const orderCredentials = storedCredentials[order._id]
        return orderCredentials ? { ...order, ...orderCredentials } : order
      })
      
      setOrders(ordersWithCredentials)
    } catch (error) {
      // console.error('Error fetching orders:', error)
      // Fallback to localStorage if API endpoint doesn't exist
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      setOrders(storedOrders.reverse())
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text, fieldId) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const togglePasswordVisibility = (orderId, accountIndex) => {
    const key = `${orderId}-${accountIndex}`
    setShowPasswords(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const viewOrderDetails = (orderId) => {
    navigate(`/dashboard/purchase-success/${orderId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RecentOrder />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <div className="text-sm text-gray-600">
          {orders.length} order(s) found
        </div>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-4">Start shopping to see your orders here!</p>
          <button
            onClick={() => navigate('/dashboard/user-products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id || order.id} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaShoppingCart className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {order.logId?.logName || order.product?.platform || order.logName || 'Product'} - {order.product?.type || order.logId?.category || 'Account'}
                    </h3>
                    <p className="text-gray-600">Order #{order._id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold text-lg">₦{order.totalPrice || order.amount}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 text-green-600 bg-green-50">
                    <FaCheckCircle className="text-green-500" />
                    <span>Completed</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Quantity</p>
                  <p className="font-medium">{order.quantity || 1} account(s)</p>
                </div>
                <div>
                  <p className="text-gray-600">Order Date</p>
                  <p className="font-medium flex items-center space-x-1">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{new Date(order.purchaseDate || order.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Price per Account</p>
                  <p className="font-medium">₦{order.product?.price || order.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Platform</p>
                  <p className="font-medium">{order.product?.country || 'N/A'}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  {/* <h4 className="font-medium text-gray-900">Account Details:</h4> */}
                  <button
                    onClick={() => viewOrderDetails(order._id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Full Details
                  </button>
                </div>
                <div className="space-y-3">
                  {order.credentials?.map((credentialString, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-gray-900">Account {index + 1}</h5>
                        <button
                          onClick={() => copyToClipboard(credentialString, `credential-${order._id}-${index}`)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {copiedField === `credential-${order._id}-${index}` ? <FaCheck className="text-green-500" /> : <FaCopy />}
                          <span>Copy</span>
                        </button>
                      </div>
                      <textarea
                        value={credentialString}
                        readOnly
                        rows="5"
                        className="w-full font-mono text-xs bg-white p-3 rounded border resize-none"
                      />
                    </div>
                  )) || (
                    <p className="text-gray-500"></p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order
