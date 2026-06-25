import React, { useState, useEffect } from 'react'
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaBox,
  FaCalendarDay,
  FaCalendarAlt,
  FaUserPlus
} from 'react-icons/fa'
import apiService from '../../services/apiService'
import API_URL from '../../Config'

const colorClasses = {
  blue: 'text-blue-500 bg-blue-50',
  green: 'text-green-500 bg-green-50',
  purple: 'text-purple-500 bg-purple-50',
  orange: 'text-orange-500 bg-orange-50',
  indigo: 'text-indigo-500 bg-indigo-50',
  teal: 'text-teal-500 bg-teal-50'
}

const formatCurrency = (amount) => `NGN ${Number(amount || 0).toLocaleString()}`

const extractOrders = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.orders)) return payload.orders
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

const extractUsers = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.users)) return payload.users
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

const extractTotalPages = (payload) => (
  payload?.totalPages ||
  payload?.pagination?.totalPages ||
  payload?.meta?.totalPages ||
  1
)

const uniqueById = (items) => {
  const seen = new Set()

  return items.filter((item, index) => {
    if (!item) return false
    const key = item._id || item.id || `item-${index}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const toDate = (value) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const dateKey = (date) => date.toLocaleDateString('en-CA')

const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

const dayLabel = (date) => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

const monthLabel = (key) => {
  const [year, month] = key.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

const addDays = (date, amount) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + amount)
  return nextDate
}

const addMonths = (date, amount) => {
  const nextDate = new Date(date)
  nextDate.setMonth(nextDate.getMonth() + amount)
  return nextDate
}

const countByPeriod = (items, getCreatedAt, getKey) => {
  return items.reduce((counts, item) => {
    const createdAt = toDate(getCreatedAt(item))
    if (!createdAt) return counts
    const key = getKey(createdAt)
    counts[key] = (counts[key] || 0) + 1
    return counts
  }, {})
}

function AdminOverview() {
  const [dashboardData, setDashboardData] = useState(null)
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError('')

      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const fetchAllOrders = async () => {
        const baseOrdersUrl = `${API_URL}/api/orders/recent`
        const buildPageUrl = (page) => `${baseOrdersUrl}?page=${page}&limit=1000&perPage=1000&pageSize=1000`
        const response = await fetch(buildPageUrl(1), { headers, credentials: 'include' })
        const firstPageData = await response.json()
        let allOrders = extractOrders(firstPageData)
        const totalPages = extractTotalPages(firstPageData)

        if (totalPages > 1) {
          const pageRequests = []
          for (let page = 2; page <= totalPages; page += 1) {
            pageRequests.push(fetch(buildPageUrl(page), { headers, credentials: 'include' }))
          }

          const pageResponses = await Promise.all(pageRequests)
          const pagePayloads = await Promise.all(pageResponses.map((res) => res.json()))
          allOrders = [...allOrders, ...pagePayloads.flatMap((payload) => extractOrders(payload))]
        }

        return uniqueById(allOrders)
      }

      const fetchAllUsers = async () => {
        const response = await fetch(`${API_URL}/api/admin/users?limit=1000`, {
          headers,
          credentials: 'include'
        })
        const data = await response.json()
        return uniqueById(extractUsers(data))
      }

      const [dashboardResponse, ordersResponse, usersResponse] = await Promise.all([
        apiService.getAdminDashboard(),
        fetchAllOrders(),
        fetchAllUsers()
      ])

      setDashboardData(dashboardResponse)
      setOrders(ordersResponse)
      setUsers(usersResponse)
    } catch {
      setError('Failed to load dashboard data')
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

  const customers = users.filter((user) => !user.isAdmin)
  const now = new Date()
  const todayKey = dateKey(now)
  const thisMonthKey = monthKey(now)
  const orderCountsByDay = countByPeriod(orders, (order) => order.createdAt, dateKey)
  const customerCountsByDay = countByPeriod(customers, (user) => user.createdAt, dateKey)
  const orderCountsByMonth = countByPeriod(orders, (order) => order.createdAt, monthKey)
  const customerCountsByMonth = countByPeriod(customers, (user) => user.createdAt, monthKey)
  const dailyBreakdown = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(now, index - 6)
    const key = dateKey(date)

    return {
      key,
      label: dayLabel(date),
      orders: orderCountsByDay[key] || 0,
      customers: customerCountsByDay[key] || 0
    }
  })
  const monthlyBreakdown = Array.from({ length: 6 }, (_, index) => {
    const date = addMonths(now, index - 5)
    const key = monthKey(date)

    return {
      key,
      label: monthLabel(key),
      orders: orderCountsByMonth[key] || 0,
      customers: customerCountsByMonth[key] || 0
    }
  })
  const maxDailyValue = Math.max(...dailyBreakdown.flatMap((item) => [item.orders, item.customers]), 1)
  const maxMonthlyValue = Math.max(...monthlyBreakdown.flatMap((item) => [item.orders, item.customers]), 1)

  const stats = [
    { title: 'Total Users', value: dashboardData?.stats?.totalUsers || users.length || 0, icon: <FaUsers />, color: 'blue' },
    { title: 'Total Orders', value: dashboardData?.stats?.totalOrders || orders.length || 0, icon: <FaShoppingCart />, color: 'green' },
    { title: 'Revenue', value: formatCurrency(dashboardData?.stats?.totalRevenue || orders.reduce((sum, order) => sum + Number(order.amount || 0), 0)), icon: <FaMoneyBillWave />, color: 'purple' },
    { title: 'Total Logs', value: dashboardData?.stats?.totalLogs || 0, icon: <FaBox />, color: 'orange' },
    { title: 'Orders Today', value: orderCountsByDay[todayKey] || 0, icon: <FaCalendarDay />, color: 'indigo' },
    { title: 'New Customers Today', value: customerCountsByDay[todayKey] || 0, icon: <FaUserPlus />, color: 'teal' },
    { title: 'Orders This Month', value: orderCountsByMonth[thisMonthKey] || 0, icon: <FaCalendarAlt />, color: 'green' },
    { title: 'New Customers This Month', value: customerCountsByMonth[thisMonthKey] || 0, icon: <FaUsers />, color: 'blue' }
  ]

  const recentOrders = dashboardData?.recentOrders || orders.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${colorClasses[stat.color]} text-2xl p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Daily Activity</h2>
            <p className="text-sm text-gray-500">Last 7 days</p>
          </div>
          <div className="space-y-4">
            {dailyBreakdown.map((item) => (
              <div key={item.key} className="grid grid-cols-[84px_1fr] gap-4 items-center">
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-xs text-gray-500">Orders</span>
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${(item.orders / maxDailyValue) * 100}%` }} />
                    </div>
                    <span className="w-8 text-sm font-semibold text-gray-900 text-right">{item.orders}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-xs text-gray-500">Customers</span>
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(item.customers / maxDailyValue) * 100}%` }} />
                    </div>
                    <span className="w-8 text-sm font-semibold text-gray-900 text-right">{item.customers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Activity</h2>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </div>
          <div className="space-y-4">
            {monthlyBreakdown.map((item) => (
              <div key={item.key} className="grid grid-cols-[84px_1fr] gap-4 items-center">
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-xs text-gray-500">Orders</span>
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${(item.orders / maxMonthlyValue) * 100}%` }} />
                    </div>
                    <span className="w-8 text-sm font-semibold text-gray-900 text-right">{item.orders}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-xs text-gray-500">Customers</span>
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(item.customers / maxMonthlyValue) * 100}%` }} />
                    </div>
                    <span className="w-8 text-sm font-semibold text-gray-900 text-right">{item.customers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order._id || order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.logId?.logName || 'Product'}</p>
                  <p className="text-sm text-gray-600">{toDate(order.createdAt)?.toLocaleDateString() || 'No date'}</p>
                  <p className="font-medium text-gray-900">{order.userId?.userName || order.userId?.email || 'Unknown User'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(order.amount)}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {order.status || 'completed'}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">Customers Today</p>
              <p className="text-3xl font-bold text-blue-900">{customerCountsByDay[todayKey] || 0}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">Orders Today</p>
              <p className="text-3xl font-bold text-green-900">{orderCountsByDay[todayKey] || 0}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">Customers This Month</p>
              <p className="text-3xl font-bold text-indigo-900">{customerCountsByMonth[thisMonthKey] || 0}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">Orders This Month</p>
              <p className="text-3xl font-bold text-purple-900">{orderCountsByMonth[thisMonthKey] || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview
