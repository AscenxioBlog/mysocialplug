import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaWallet, FaSearch, FaSpinner } from 'react-icons/fa'
import apiService from '../../services/apiService'
import API_URL from '../../Config'

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
      const response = await fetch(`${API_URL}/api/logs`)
      const data = await response.json()
      setProducts(data.logs || [])
    } catch (error) {
      // console.error('Error fetching products:', error)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const fetchWalletBalance = async () => {
    try {
      const response = await fetch(`${API_URL}/api/wallet/balance`, {
        credentials: 'include'
      })
      const data = await response.json()
      setWalletBalance(data.balance || 0)
    } catch (error) {
      // console.error('Error fetching wallet balance:', error)
    }
  }

  const getCategoryImage = (category, productName = '') => {
    const categoryLower = category?.toLowerCase() || ''
    const productNameLower = productName?.toLowerCase() || ''

    // Force specific image for HMA VPN FOR PHONE / HMA VPN FOR PC products/categories
    if (
      categoryLower.includes('hma vpn for phone') ||
      productNameLower.includes('hma vpn for phone') ||
      categoryLower.includes('hma vpn for pc') ||
      productNameLower.includes('hma vpn for pc')
    ) {
      return { webp: '/phoneHma.jpeg', fallback: '/phoneHma.jpeg' }
    }

    // Force specific image for EXPRESS VPN FOR PHONE / EXPRESS VPN FOR PC products/categories
    if (
      categoryLower.includes('express vpn for phone') ||
      productNameLower.includes('express vpn for phone') ||
      productNameLower.includes('express vpn | one month') ||
      categoryLower.includes('express vpn for pc') ||
      productNameLower.includes('express vpn for pc')
    ) {
      return { webp: '/newExpressVpn.jpeg', fallback: '/newExpressVpn.jpeg' }
    }

    // Force specific image for PIA FOR PHONE products/categories
    if (
      categoryLower.includes('pia vpn for phone') ||
      productNameLower.includes('pia vpn for phone') ||
      productNameLower.includes('pia vpn') ||
      categoryLower.includes('pia for phone') ||
      productNameLower.includes('pia for phone')
    ) {
      return { webp: '/phonepia.jpeg', fallback: '/phonepia.jpeg' }
    }
    
    // Check if category contains 'dating' and use Facebook dating image
    if (categoryLower.includes('dating')) {
      return { webp: '/webp/Facebook dating.webp', fallback: '/Facebook dating.jpg' }
    }
    
    // Check if category contains 'facebook' and use Facebook icon
    if (categoryLower.includes('facebook')) {
      return null // Use Facebook icon instead of image
    }
    
    const imageMap = {
      'vpn': { webp: '/webp/allvpn.webp', fallback: '/allvpn.jpg' },
      'proxy': { webp: '/webp/pia sock 5 proxy.webp', fallback: '/pia sock 5 proxy.jpg' },
      'texting apps': { webp: '/textplus.jpeg', fallback: '/textplus.jpeg' },
      'tiktok': { webp: '/webp/TikTok.webp', fallback: '/TikTok.jpg' },
      'twitter': { webp: '/webp/X.webp', fallback: '/X.jpg' },
      'x': { webp: '/webp/X.webp', fallback: '/X.jpg' },
      'snapchat': { webp: '/webp/Snapchart.webp', fallback: '/Snapchart.jpg' },
      'gmail': { webp: '/webp/Gmail.webp', fallback: '/Gmail.jpg' },
      'expressvpn': { webp: '/newExpressVpn.jpeg', fallback: '/newExpressVpn.jpeg' },
      'nordvpn': { webp: '/webp/allvpn.webp', fallback: '/allvpn.jpg' },
      'vpn': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'hmavpn': { webp: '/webp/allvpn.webp', fallback: '/allvpn.jpg' },
      'piavpn': { webp: '/webp/allvpn.webp', fallback: '/allvpn.jpg' },
      'pvanishvpn': { webp: '/webp/allvpn.webp', fallback: '/allvpn.jpg' },
      'surfshark': { webp: '/webp/allvpn.webp', fallback: '/allvpn.jpg' },
      'pia sock 5 proxy': { webp: '/webp/pia sock 5 proxy.webp', fallback: '/pia sock 5 proxy.jpg' },
      'texting app': { webp: '/textplus.jpeg', fallback: '/textplus.jpeg' },
      'textingapp': { webp: '/textplus.jpeg', fallback: '/textplus.jpeg' }
    }
    return imageMap[categoryLower] || null
  }

  const getCategoryColor = (category) => {
    const categoryLower = category?.toLowerCase() || ''
    
    switch (categoryLower) {
      case 'facebook': case 'facebook dating': case 'random country facebook': case 'create another profile facebook': return 'bg-blue-50 border-blue-200'
      case 'vpn': return 'bg-green-50 border-green-200'
      case 'proxy': return 'bg-purple-50 border-purple-200'
      case 'texting apps': return 'bg-indigo-50 border-indigo-200'
      case 'instagram': return 'bg-pink-50 border-pink-200'
      case 'twitter': case 'x': return 'bg-sky-50 border-sky-200'
      case 'tiktok': return 'bg-gray-50 border-gray-200'
      case 'linkedin': return 'bg-blue-50 border-blue-200'
      case 'snapchat': return 'bg-yellow-50 border-yellow-200'
      case 'gmail': return 'bg-red-50 border-red-200'
      case 'streaming': return 'bg-red-50 border-red-200'
      case 'music': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getCategoryIcon = (category) => {
    const imageData = getCategoryImage(category)
    if (imageData) {
      return (
        <picture>
          <source srcSet={imageData.webp} type="image/webp" />
          <img src={imageData.fallback} alt={category} className="w-12 h-12 object-cover rounded-lg" />
        </picture>
      )
    }
    
    const categoryLower = category?.toLowerCase() || ''
    
    if (categoryLower.includes('facebook') || categoryLower === 'social') {
      return <FaFacebook className="text-blue-600 text-3xl" />
    }
    
    switch (categoryLower) {
       case 'instagram': return <FaInstagram className="text-pink-500 text-3xl" />
       case 'twitter': return <FaTwitter className="text-sky-500 text-3xl" />
       case 'tiktok': return <FaTiktok className="text-black text-3xl" />
       case 'linkedin': return <FaLinkedin className="text-blue-700 text-3xl" />
       default: return <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs">{category?.charAt(0)?.toUpperCase()}</div>
    }
  }

  const handleViewDetails = (product) => {
    navigate(`/dashboard/log-details/${product._id || product.id}`)
  }

  // Normalize categories to group similar ones together
  const normalizeCategory = (category) => {
    const categoryLower = category?.toLowerCase() || ''
    
    // Group VPN-related categories
    if (categoryLower.includes('vpn') || categoryLower.includes('expressvpn') || 
        categoryLower.includes('nordvpn') || categoryLower.includes('hmavpn') || 
        categoryLower.includes('piavpn') || categoryLower.includes('pvanishvpn') || 
        categoryLower.includes('surfshark')) {
      return 'VPN'
    }
    
    // Group proxy-related categories separately
    if (categoryLower.includes('proxy')) {
      return 'Proxy'
    }
    
    // Handle CREATE ANOTHER PROFILE FACEBOOK as standalone category
    if (categoryLower.includes('create another profile') && categoryLower.includes('facebook')) {
      return 'CREATE ANOTHER PROFILE FACEBOOK'
    }
    
    // Handle HQ USA FACEBOOK as standalone category
    if (categoryLower.includes('hq usa') && categoryLower.includes('facebook')) {
      return 'HQ USA FACEBOOK'
    }
    
    // Group all RANDOM COUNTRY FACEBOOK logs together
    if (categoryLower.includes('random country') && categoryLower.includes('facebook')) {
      return 'RANDOM COUNTRY FACEBOOK'
    }
    
    if (categoryLower.includes('facebook') && !categoryLower.includes('dating')) {
      // Keep regular Facebook as its own category
      if (categoryLower === 'facebook') {
        return 'Facebook'
      }
      // Group other Facebook variants under Random country Facebook
      return 'RANDOM COUNTRY FACEBOOK'
    }
    
    // Keep Facebook dating separate
    if (categoryLower.includes('dating')) {
      return 'Facebook Dating'
    }
    
    // Group texting apps
    if (categoryLower.includes('texting')) {
      return 'Texting Apps'
    }
    
    // Return original category for others
    return category || 'Other'
  }

  const groupedProducts = products.reduce((acc, product) => {
    const normalizedCategory = normalizeCategory(product.category)
    if (!acc[normalizedCategory]) {
      acc[normalizedCategory] = []
    }
    acc[normalizedCategory].push(product)
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

  // Sort categories to put Facebook categories at the top
  const sortedFilteredProducts = Object.entries(filteredGroupedProducts).sort(([categoryA], [categoryB]) => {
    const aIsFacebook = categoryA.toLowerCase().includes('facebook')
    const bIsFacebook = categoryB.toLowerCase().includes('facebook')
    
    if (aIsFacebook && !bIsFacebook) return -1
    if (!aIsFacebook && bIsFacebook) return 1
    return categoryA.localeCompare(categoryB)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Logs</h1>
          <p className="text-gray-600">Choose from our premium account logs</p>
        </div>
        <div className="text-sm text-gray-600">
          {sortedFilteredProducts.flatMap(([, products]) => products).length} products found
        </div>
        
        {/* <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
          <FaWallet />
          <span className="font-semibold">₦{walletBalance.toFixed(2)}</span>
        </div> */}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-2 shadow-sm">
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
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="x">X</option>
            <option value="tiktok">TikTok</option>
            <option value="snapchat">Snapchat</option>
            <option value="linkedin">LinkedIn</option>
            <option value="gmail">Gmail</option>
            <option value="expressvpn">ExpressVPN</option>
            <option value="nordvpn">NordVPN</option>
            <option value="hmavpn">HMA VPN</option>
            <option value="piavpn">PIA VPN</option>
            <option value="pvanishvpn">PVanish VPN</option>
            <option value="surfshark">Surfshark</option>
            <option value="vpn">VPN</option>
            <option value="proxy">Proxy</option>
            <option value="texting app">Texting App</option>
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
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
          {sortedFilteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            sortedFilteredProducts.map(([category, categoryProducts]) => (
              <div key={category} className="bg-white rounded-xl p-2 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  {getCategoryIcon(category)}
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">{category}</h2>
                </div>
                
                <div className=" min-h-[80px] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                  {categoryProducts.map((product) => (
                    <div 
                      key={product._id || product.id}
                      className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
                        {getCategoryImage(product.category || category, product.logName || product.title) && (
                          <picture>
                            <source srcSet={getCategoryImage(product.category || category, product.logName || product.title).webp} type="image/webp" />
                            <img 
                              src={getCategoryImage(product.category || category, product.logName || product.title).fallback} 
                              alt={category} 
                              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover rounded-lg" 
                            />
                          </picture>
                        )}
                        <div className="flex-1">
                          <span className="text-xs sm:text-sm md:text-lg font-semibold block">{product.logName || product.title}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{product.category}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm truncate">{product.description?.substring(0, 50)}...</p>
                      <p className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-3">
                        Available: {product.availableQuantity || product.accounts?.length || product.availableAccounts || product.stock || 0} accounts
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-green-600">₦{product.price}</span>
                        <button 
                          onClick={() => handleViewDetails(product)}
                          className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-black text-white hover:bg-gray-800 transition-colors"
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
