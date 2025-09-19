import React, { useState } from 'react'
import { FaSearch, FaEdit, FaTrash, FaBan, FaCheck, FaEye } from 'react-icons/fa'

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      walletBalance: 250.75,
      totalOrders: 12,
      totalSpent: 420.50,
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      walletBalance: 180.25,
      totalOrders: 8,
      totalSpent: 280.00,
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      walletBalance: 0.00,
      totalOrders: 6,
      totalSpent: 210.75,
      status: 'suspended',
      joinDate: '2024-01-05',
      lastLogin: '2024-01-18'
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="text-sm text-gray-600">
          {filteredUsers.length} users found
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
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
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Wallet</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">₦{user.walletBalance.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{user.totalOrders}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">₦{user.totalSpent.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1">
                        <FaEdit />
                      </button>
                      {user.status === 'active' ? (
                        <button className="text-yellow-600 hover:text-yellow-900 p-1">
                          <FaBan />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900 p-1">
                          <FaCheck />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₦{users.reduce((sum, u) => sum + u.totalSpent, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg. Spent</h3>
          <p className="text-3xl font-bold text-orange-600">
            ₦{(users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserManagement