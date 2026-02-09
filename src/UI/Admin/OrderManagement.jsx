import React, { useState, useEffect } from 'react'
import { FaSearch, FaEye, FaDownload, FaCheck, FaTimes, FaShoppingCart, FaCalendarAlt } from 'react-icons/fa'
import API_URL from '../../Config'

function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [orders, setOrders] = useState([])
  const [totalOrdersCount, setTotalOrdersCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const extractOrders = (payload) => {
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload?.orders)) return payload.orders
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.results)) return payload.results
    return []
  }

  const extractTotalPages = (payload) => {
    return (
      payload?.totalPages ||
      payload?.pagination?.totalPages ||
      payload?.meta?.totalPages ||
      1
    )
  }

  const extractTotalCount = (payload) => {
    return (
      payload?.totalOrders ||
      payload?.totalCount ||
      payload?.total ||
      payload?.count ||
      payload?.pagination?.total ||
      payload?.meta?.total ||
      null
    )
  }

  const fetchOrders = async () => {
    try {
      const baseOrdersUrl = `${API_URL}/api/admin/orders`
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }

      const buildPageUrl = (page) =>
        `${baseOrdersUrl}?page=${page}&limit=1000&perPage=1000&pageSize=1000`

      const response = await fetch(buildPageUrl(1), {
        headers: {
          ...headers
        },
        credentials: 'include'
      })
      const firstPageData = await response.json()

      let allOrders = extractOrders(firstPageData)
      const totalPages = extractTotalPages(firstPageData)
      const totalCountFromApi = extractTotalCount(firstPageData)

      if (totalPages > 1) {
        const pageRequests = []
        for (let page = 2; page <= totalPages; page += 1) {
          pageRequests.push(
            fetch(buildPageUrl(page), {
              headers: {
                ...headers
              },
              credentials: 'include'
            })
          )
        }

        const pageResponses = await Promise.all(pageRequests)
        const pagePayloads = await Promise.all(pageResponses.map((res) => res.json()))
        const pagedOrders = pagePayloads.flatMap((payload) => extractOrders(payload))
        allOrders = [...allOrders, ...pagedOrders]
      }

      const seenOrderKeys = new Set()
      const uniqueOrders = allOrders.filter((order, index) => {
        if (!order) return false
        const key = order._id || order.id || `order-${index}`
        if (seenOrderKeys.has(key)) return false
        seenOrderKeys.add(key)
        return true
      })

      setOrders(uniqueOrders)
      setTotalOrdersCount(totalCountFromApi || uniqueOrders.length)
    } catch (error) {
      // console.error('Error fetching orders:', error)
      // console.error('Error details:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userId?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.logId?.logName?.toLowerCase().includes(searchTerm.toLowerCase())
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
    // console.log(`Updating order ${orderId} to ${newStatus}`)
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

      {/* Orders - Mobile Cards & Desktop Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading orders...
          </div>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="block md:hidden">
              {filteredOrders.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No orders found
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  {filteredOrders.map((order) => (
                    <div key={order._id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">#{order._id?.slice(-8)}</p>
                          <p className="text-sm text-gray-600">{order.userId?.userName || `User ${order.userId?._id?.slice(-8) || 'N/A'}`}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status || 'completed')}`}>
                          {(order.status || 'completed').charAt(0).toUpperCase() + (order.status || 'completed').slice(1)}
                        </span>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">{order.logId?.logName || 'Product'}</p>
                        <p className="text-sm text-gray-500">{order.logId?.category || 'Social Media Account'}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Amount: <span className="font-semibold text-gray-900">₦{order.amount}</span></p>
                          <p className="text-sm text-gray-600">Qty: {order.quantity || 1}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                          <div className="flex space-x-2 mt-1">
                            <button className="text-blue-600 hover:text-blue-900 p-1" title="View Details">
                              <FaEye />
                            </button>
                            <button className="text-green-600 hover:text-green-900 p-1" title="Download">
                              <FaDownload />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
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
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">#{order._id?.slice(-8)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.userId?.userName || `User ID: ${order.userId?._id?.slice(-8) || 'N/A'}`}</p>
                            <p className="text-sm text-gray-500">{order.userId?.email || 'Customer'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.logId?.logName || 'Product'}</p>
                            <p className="text-sm text-gray-500">{order.logId?.category || 'Social Media Account'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900">{order.quantity || 1}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">₦{order.amount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status || 'completed')}`}>
                            {(order.status || 'completed').charAt(0).toUpperCase() + (order.status || 'completed').slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 p-1" title="View Details">
                              <FaEye />
                            </button>
                            <button className="text-green-600 hover:text-green-900 p-1" title="Download">
                              <FaDownload />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2">Total Orders</h3>
          <p className="text-xl md:text-3xl font-bold text-blue-600">{totalOrdersCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {orders.filter(order => order.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₦{orders.reduce((sum, order) => sum + (order.amount || 0), 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {orders.filter(order => order.status === 'pending').length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderManagement
