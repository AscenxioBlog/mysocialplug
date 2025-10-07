import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaShoppingCart, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes, FaWallet, FaPlus, FaHistory, FaChartLine } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import apiService from '../../services/apiService'

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const userData = {
    name: user?.userName || 'User',
    email: user?.email || '',
    walletBalance: walletBalance
  }

  useEffect(() => {
    fetchWalletBalance()
  }, [])

  const fetchWalletBalance = async () => {
    try {
      const response = await apiService.getWalletBalance()
      setWalletBalance(response.balance || 0)
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
    { name: 'My Orders', icon: <FaShoppingCart />, path: '/dashboard/orders' },
    { name: 'Products', icon: <FaWallet />, path: '/dashboard/user-products' },
    { name: 'Profile', icon: <FaUser />, path: '/dashboard/user-profile' },
    // { name: 'Settings', icon: <FaCog />, path: '/dashboard/settings' }
  ]



  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">MySocialLog</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <button 
              onClick={handleLogout}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaBars className="text-xl" />
            </button>
            
            <div className="flex items-center space-x-6">
              {/* Wallet Balance */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <FaWallet />
                <span className="font-semibold">₦{userData.walletBalance.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardContent