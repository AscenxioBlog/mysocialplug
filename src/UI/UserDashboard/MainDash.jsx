import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { FiHome, FiShoppingBag, FiShoppingCart, FiUser, FiLogOut, FiDollarSign } from 'react-icons/fi'

function MainDash() {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Overview' },
    { path: '/dashboard/user-products', icon: FiShoppingBag, label: 'Products' },
    { path: '/dashboard/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/dashboard/wallet', icon: FiDollarSign, label: 'Wallet' },
    { path: '/dashboard/profile', icon: FiUser, label: 'Profile' },
    { path: '/dashboard/log-details/:id', icon: FiShoppingBag, label: 'Log Details' }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">MySocialPlug</h2>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-6 left-6">
          <button className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
            <FiLogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default MainDash