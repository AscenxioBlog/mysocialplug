import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaWallet, FaSearch, FaSpinner } from 'react-icons/fa'
import apiService from '../../services/apiService'

function Product() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [countryFilter, setCountryFilter] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [walletBalance, setWalletBalance] = useState(0)

  useEffect(() => {
    fetchProducts()
    fetchWalletBalance()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://sociallogs.onrender.com/api/logs')
      const data = await response.json()
      setProducts(data.logs || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const fetchWalletBalance = async () => {
    try {
      const response = await fetch('https://sociallogs.onrender.com/api/wallet/balance', {
        credentials: 'include'
      })
      const data = await response.json()
      setWalletBalance(data.balance || 0)
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
    }
  }

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'social': case 'facebook': return 'bg-blue-50 border-blue-200'
      case 'instagram': return 'bg-pink-50 border-pink-200'
      case 'twitter': return 'bg-sky-50 border-sky-200'
      case 'tiktok': return 'bg-gray-50 border-gray-200'
      case 'linkedin': return 'bg-blue-50 border-blue-200'
      case 'streaming': return 'bg-red-50 border-red-200'
      case 'music': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
       case 'social': case 'facebook': return <FaFacebook className="text-blue-600 text-3xl" />
       case 'instagram': return <FaInstagram className="text-pink-500 text-3xl" />
       case 'twitter': return <FaTwitter className="text-sky-500 text-3xl" />
       case 'tiktok': return <FaTiktok className="text-black text-3xl" />
       case 'linkedin': return <FaLinkedin className="text-blue-700 text-3xl" />
       // case 'streaming': return <FaFacebook className="text-red-600 text-3xl" />
       // case 'music': return <FaInstagram className="text-green-500 text-3xl" />
       default: return null
    }
  }

  const handleViewDetails = (product) => {
    navigate(`/dashboard/log-details/${product._id || product.id}`)
  }

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {})

  const filteredGroupedProducts = Object.entries(groupedProducts).reduce((acc, [category, categoryProducts]) => {
    const filtered = categoryProducts.filter(product => {
      const matchesSearch = (product.logName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      const matchesPlatform = platformFilter === 'all' || category?.toLowerCase() === platformFilter.toLowerCase()
      return matchesSearch && matchesPlatform
    })
    if (filtered.length > 0) {
      acc[category] = filtered
    }
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Logs</h1>
          <p className="text-gray-600">Choose from our premium account logs</p>
        </div>
        <div className="text-sm text-gray-600">
          {Object.values(filteredGroupedProducts).flat().length} products found
        </div>
        
        {/* <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
          <FaWallet />
          <span className="font-semibold">₦{walletBalance.toFixed(2)}</span>
        </div> */}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="social">Social</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
            <option value="linkedin">LinkedIn</option>
            <option value="streaming">Streaming</option>
            <option value="music">Music</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-8">
          {[1, 2, 3].map((category) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-3 animate-pulse"></div>
                    
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Products by Category */}
      {!loading && !error && (
        <div className="space-y-8">
          {Object.keys(filteredGroupedProducts).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            Object.entries(filteredGroupedProducts).map(([category, categoryProducts]) => (
              <div key={category} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  {getCategoryIcon(category)}
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">{category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categoryProducts.map((product) => (
                    <div 
                      key={product._id || product.id}
                      className={`${getCategoryColor(category)} p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-lg font-semibold">{product.logName || product.title}</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{category}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-2 text-sm">{product.description}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Available'}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">₦{product.price}</span>
                        <button 
                          onClick={() => handleViewDetails(product)}
                          className="px-3 py-1 rounded text-sm bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}


    </div>
  )
}

export default Product