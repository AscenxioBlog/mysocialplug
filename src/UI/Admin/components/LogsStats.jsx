import React from 'react'

function LogsStats({ logs }) {
  const totalLogs = logs.length
  const categories = new Set(logs.map(log => log.category)).size
  const avgPrice = logs.length > 0 ? Math.round(logs.reduce((sum, log) => sum + log.price, 0) / logs.length) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Logs</h3>
        <p className="text-3xl font-bold text-blue-600">{totalLogs}</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Available</h3>
        <p className="text-3xl font-bold text-green-600">{totalLogs}</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
        <p className="text-3xl font-bold text-purple-600">{categories}</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Price</h3>
        <p className="text-3xl font-bold text-orange-600">₦{avgPrice}</p>
      </div>
    </div>
  )
}

export default LogsStats