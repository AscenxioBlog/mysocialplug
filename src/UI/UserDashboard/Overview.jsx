import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWallet, FaShoppingCart, FaChartLine, FaUser, FaPlus, FaHistory, FaCopy, FaCheck } from 'react-icons/fa'

function Overview() {
  const [showFundModal, setShowFundModal] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    walletBalance: 250.75,
    walletNumber: '1A2B3C4D5E6F7G8H9I0J',
    totalOrders: 12,
    totalSpent: 1450.50,
    memberSince: '2024'
  }

  const copyWalletNumber = () => {
    navigator.clipboard.writeText(userData.walletNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wallet Balance</p>
              <p className="text-2xl font-bold text-green-600">₦{userData.walletBalance.toFixed(2)}</p>
            </div>
            <FaWallet className="text-green-500 text-2xl" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{userData.totalOrders}</p>
            </div>
            <FaShoppingCart className="text-blue-500 text-2xl" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-purple-600">₦{userData.totalSpent.toFixed(2)}</p>
            </div>
            <FaChartLine className="text-purple-500 text-2xl" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-2xl font-bold text-orange-600">{userData.memberSince}</p>
            </div>
            <FaUser className="text-orange-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Wallet Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Wallet Information</h2>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 mb-1">Wallet Number</p>
            <p className="text-lg font-mono text-gray-900">{userData.walletNumber}</p>
          </div>
          <button
            onClick={copyWalletNumber}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {copied ? <FaCheck /> : <FaCopy />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/user-products"
            className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg transition-colors"
          >
            <FaPlus />
            <span>Browse Products</span>
          </Link>
          <Link
            to="/dashboard/user-products"
            className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg transition-colors"
          >
            <FaShoppingCart />
            <span>Shop Now</span>
          </Link>
          <Link
            to="/dashboard/orders"
            className="flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-lg transition-colors"
          >
            <FaHistory />
            <span>Order History</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Overview