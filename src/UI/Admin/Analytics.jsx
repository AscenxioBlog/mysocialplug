import React, { useState } from 'react'
import { FaCalendarAlt, FaDownload, FaArrowUp, FaArrowDown } from 'react-icons/fa'

function Analytics() {
  const [dateRange, setDateRange] = useState('7days')

  const salesData = [
    { date: '2024-01-15', orders: 12, revenue: 420, users: 8 },
    { date: '2024-01-16', orders: 15, revenue: 525, users: 12 },
    { date: '2024-01-17', orders: 8, revenue: 280, users: 6 },
    { date: '2024-01-18', orders: 18, revenue: 630, users: 14 },
    { date: '2024-01-19', orders: 22, revenue: 770, users: 18 },
    { date: '2024-01-20', orders: 16, revenue: 560, users: 11 },
    { date: '2024-01-21', orders: 20, revenue: 700, users: 15 }
  ]

  const topProducts = [
    { name: 'Instagram - USA Standard', sales: 45, revenue: 1575, percentage: 35 },
    { name: 'Facebook - USA Standard', sales: 32, revenue: 800, percentage: 25 },
    { name: 'TikTok - USA Premium', sales: 18, revenue: 1440, percentage: 20 },
    { name: 'Twitter - USA Standard', sales: 25, revenue: 500, percentage: 15 },
    { name: 'LinkedIn - USA Standard', sales: 8, revenue: 240, percentage: 5 }
  ]

  const platformStats = [
    { platform: 'Instagram', orders: 45, revenue: 1575, growth: 12 },
    { platform: 'Facebook', orders: 32, revenue: 800, growth: 8 },
    { platform: 'TikTok', orders: 18, revenue: 1440, growth: -5 },
    { platform: 'Twitter', orders: 25, revenue: 500, growth: 15 },
    { platform: 'LinkedIn', orders: 8, revenue: 240, growth: 3 }
  ]

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0)
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <FaDownload />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₦{totalRevenue}</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 text-sm mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 text-sm mr-1" />
                <span className="text-sm text-green-600">+8.2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">₦{avgOrderValue.toFixed(0)}</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 text-sm mr-1" />
                <span className="text-sm text-green-600">+3.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Customers</p>
              <p className="text-2xl font-bold text-gray-900">84</p>
              <div className="flex items-center mt-1">
                <FaArrowDown className="text-red-500 text-sm mr-1" />
                <span className="text-sm text-red-600">-2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales</h2>
          <div className="space-y-3">
            {salesData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{new Date(day.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{day.orders} orders • {day.users} customers</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₦{day.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-gray-900">₦{product.revenue}</p>
                  <p className="text-sm text-gray-600">{product.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {platformStats.map((platform, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{platform.platform}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{platform.orders}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">₦{platform.revenue}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {platform.growth >= 0 ? (
                        <FaArrowUp className="text-green-500 text-sm mr-1" />
                      ) : (
                        <FaArrowDown className="text-red-500 text-sm mr-1" />
                      )}
                      <span className={`text-sm ${platform.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {platform.growth >= 0 ? '+' : ''}{platform.growth}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics