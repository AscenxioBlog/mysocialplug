import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaWallet, FaShoppingCart, FaChartLine, FaUser, FaPlus, FaHistory, FaCopy, FaCheck } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import apiService from '../../services/apiService'
import Product from './Product'
import SupportModal from '../../components/SupportModal'

function Overview() {
  const [copied, setCopied] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showAmountModal, setShowAmountModal] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [amount, setAmount] = useState('')
  const [showSupportModal, setShowSupportModal] = useState(true)
  const { user } = useAuth()
  
  const userData = {
    name: user?.userName || 'User',
    email: user?.email || '',
    walletBalance: walletBalance,
    walletNumber: user?.id || '1A2B3C4D5E6F7G8H9I0J',
    totalOrders: totalOrders,
    totalSpent: totalSpent,
    memberSince: user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'
  }

  useEffect(() => {
    fetchWalletBalance()
    fetchOrderStats()
    
    // Refresh balance when user returns from payment
    const handleFocus = () => {
      fetchWalletBalance()
      fetchOrderStats()
    }
    
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const fetchWalletBalance = async () => {
    try {
      const response = await apiService.getWalletBalance()
      setWalletBalance(response.balance || 0)
    } catch (error) {
      // Error handled silently
    }
  }

  const fetchOrderStats = async () => {
    try {
      const response = await apiService.getOrders()
      if (response.orders || response) {
        const orders = response.orders || response
        setTotalOrders(orders.length)
        const total = orders.reduce((sum, order) => {
          const orderAmount = order.amount || order.price || order.total || order.totalAmount || 0
          return sum + parseFloat(orderAmount)
        }, 0)
        setTotalSpent(total)
      }
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false)
    }
  }

  const handleAddFunds = async (fundAmount) => {
    if (!fundAmount || fundAmount <= 0) {
      alert('Please enter a valid amount')
      return
    }
    
    try {
      const result = await apiService.addFunds(fundAmount)
      
      if (result.payment_link) {
        window.location.href = result.payment_link
      } else if (result.data && result.data.link) {
        window.location.href = result.data.link
      } else {
        alert('Payment URL not available')
      }
    } catch (error) {
      alert('Error initializing payment')
    }
  }

  const openAmountModal = () => {
    setShowAmountModal(true)
    setAmount('')
  }

  const processPayment = async () => {
    const fundAmount = parseInt(amount)
    if (fundAmount && fundAmount > 0) {
      setProcessing(true)
      await handleAddFunds(fundAmount)
      setProcessing(false)
      setShowAmountModal(false)
    } else {
      alert('Please enter a valid amount')
    }
  }

  const copyWalletNumber = () => {
    navigator.clipboard.writeText(userData.walletNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Wallet Balance</p>
              <p className="text-2xl font-bold text-green-600">₦{walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <FaWallet className="text-green-500 text-2xl" />
          </div>
          <button
            onClick={openAmountModal}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <FaPlus className="text-sm" />
            <span>Add Money</span>
          </button>
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
        
        {/* <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-2xl font-bold text-orange-600">{userData.memberSince}</p>
            </div>
            <FaUser className="text-orange-500 text-2xl" />
          </div>
        </div> */}
      </div>

     

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={openAmountModal}
            className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg transition-colors border-2 border-green-200"
          >
            <FaPlus />
            <span>Top Up Wallet</span>
          </button>
          <Link
            to="/dashboard/products"
            className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg transition-colors"
          >
            <FaPlus />
            <span>Browse Products</span>
          </Link>
          <Link
            to="/dashboard/user-products"
            className="flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-lg transition-colors"
          >
            <FaShoppingCart />
            <span>Shop Now</span>
          </Link>
          <Link
            to="/dashboard/orders"
            className="flex items-center justify-center space-x-2 bg-orange-50 hover:bg-orange-100 text-orange-700 py-3 px-4 rounded-lg transition-colors"
          >
            <FaHistory />
            <span>Order History</span>
          </Link>
        </div>
      </div> */}

      <Product />

      {/* Amount Modal */}
      {showAmountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Amount</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="1"
                autoFocus
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAmountModal(false)}
                disabled={processing}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={processing}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />
    </div>
  )
}

export default Overview