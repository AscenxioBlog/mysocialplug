import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaSearch } from "react-icons/fa";
import API_URL from '../../Config';
import SupportModal from '../../components/SupportModal';

function Index2() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSupportModal, setShowSupportModal] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/logs`)
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      setError('Failed to load logs')
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (product) => {
    navigate(`/log-details/${product._id || product.id}`)
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
      'expressvpn': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'nordvpn': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'hmavpn': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'piavpn': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'pvanishvpn': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'surfshark': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'proxy': { webp: '/webp/pia sock 5 proxy.webp', fallback: '/pia sock 5 proxy.jpg' },
      'pia sock 5 proxy': { webp: '/webp/pia sock 5 proxy.webp', fallback: '/pia sock 5 proxy.jpg' },
      'create another profile facebook': { webp: '/webp/Facebook.webp', fallback: '/Facebook.jpg' },
      'vpn': { webp: '/webp/allvpn.jpg', fallback: '/allvpn.jpg' },
      'texting app': { webp: '/textplus.jpeg', fallback: '/textplus.jpeg' },
      'textingapp': { webp: '/textplus.jpeg', fallback: '/textplus.jpeg' }
    }
    return imageMap[categoryLower] || null
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

  // Enhanced search functionality with ranking
  const getSearchScore = (log, searchTerm) => {
    const searchLower = searchTerm.toLowerCase().trim()
    const logName = log.logName?.toLowerCase() || ''
    const description = log.description?.toLowerCase() || ''
    const category = log.category?.toLowerCase() || ''
    
    let score = 0
    
    // Exact category match gets highest priority
    if (category === searchLower) score += 100
    else if (category.includes(searchLower)) score += 80
    
    // Exact product name match
    if (logName === searchLower) score += 90
    else if (logName.includes(searchLower)) score += 70
    
    // Description match
    if (description.includes(searchLower)) score += 50
    
    // Word matching
    const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0)
    searchWords.forEach(word => {
      if (category.includes(word)) score += 60
      if (logName.includes(word)) score += 40
      if (description.includes(word)) score += 20
    })
    
    return score
  }
  
  const filteredAndSortedLogs = logs
    .map(log => ({ ...log, searchScore: getSearchScore(log, searchTerm || '') }))
    .filter(log => !searchTerm || log.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore)

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
    
    // Handle CREATE ANOTHER PROFILE FACEBOOK as separate category
    if (categoryLower.includes('create another profile') && categoryLower.includes('facebook')) {
      return category
    }
    
    // Handle Facebook categories - check HQ USA first
    if (categoryLower.includes('hq usa') && categoryLower.includes('facebook')) {
      return category
    }
    
    if (categoryLower.includes('facebook') && !categoryLower.includes('dating')) {
      // Keep Random country Facebook as its own category
      if (categoryLower.includes('random country')) {
        return category
      }
      // Keep regular Facebook as its own category
      if (categoryLower === 'facebook') {
        return category
      }
      // Group other Facebook variants under Random country Facebook
      return 'Random country Facebook'
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

  const groupedLogs = filteredAndSortedLogs.reduce((acc, log) => {
    const normalizedCategory = normalizeCategory(log.category)
    if (!acc[normalizedCategory]) {
      acc[normalizedCategory] = []
    }
    acc[normalizedCategory].push(log)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchLogs} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Accounts Store</h1>
          <p className="text-gray-600">Choose your platform and country</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                  placeholder="Search products (e.g., vpn, facebook, instagram)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
        </div>

        {Object.keys(groupedLogs).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? `No results found for "${searchTerm}"` : 'No logs available at the moment.'}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedLogs).map(([category, categoryLogs]) => (
              <div key={category} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  {getCategoryIcon(category)}
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">{category}</h2>
                </div>
                
                <div className="min-h-[80px] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                  {categoryLogs.map((log) => (
                    <div 
                      key={log._id} 
                      onClick={() => handleViewDetails(log)}
                      className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
                        {getCategoryImage(log.category || category, log.logName) && (
                          <picture>
                            <source srcSet={getCategoryImage(log.category || category, log.logName).webp} type="image/webp" />
                            <img 
                              src={getCategoryImage(log.category || category, log.logName).fallback} 
                              alt={category} 
                              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover rounded-lg" 
                            />
                          </picture>
                        )}
                        <div className="flex-1">
                          <span className="text-xs sm:text-sm md:text-lg font-semibold block">{log.logName}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{log.category}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm truncate">{log.description?.substring(0, 50)}...</p>
                      <p className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-3">
                        Available: {log.availableQuantity || log.accounts?.length || log.availableAccounts || log.stock || 0} accounts
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-green-600">₦{log.price}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails(log)
                          }}
                          className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />
    </div>
  );
}

export default Index2;
