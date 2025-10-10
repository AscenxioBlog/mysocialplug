import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaSearch } from "react-icons/fa";
import API_URL from '../../Config';

function Index2() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
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

  const getCategoryImage = (category) => {
    const imageMap = {
      'facebook': { webp: '/webp/Facebook dating.webp', fallback: '/Facebook dating.jpg' },
      'tiktok': { webp: '/webp/TikTok.webp', fallback: '/TikTok.jpg' },
      'twitter': { webp: '/webp/X.webp', fallback: '/X.jpg' },
      'x': { webp: '/webp/X.webp', fallback: '/X.jpg' },
      'snapchat': { webp: '/webp/Snapchart.webp', fallback: '/Snapchart.jpg' },
      'gmail': { webp: '/webp/Gmail.webp', fallback: '/Gmail.jpg' },
      'expressvpn': { webp: '/webp/Express VPN.webp', fallback: '/Express VPN.jpg' },
      'nordvpn': { webp: '/webp/Nord vpn.webp', fallback: '/Nord vpn.jpg' },
      'hmavpn': { webp: '/webp/Hma Vpn.webp', fallback: '/Hma Vpn.jpg' },
      'piavpn': { webp: '/webp/Pia vpn.webp', fallback: '/Pia vpn.jpg' },
      'pvanishvpn': { webp: '/webp/p vanish vpn.webp', fallback: '/p vanish vpn.jpg' },
      'surfshark': { webp: '/webp/Surfshark.webp', fallback: '/Surfshark.jpg' },
      'proxy': { webp: '/webp/ia sock 5 proxy.webp', fallback: '/ia sock 5 proxy.jpg' },
      'vpn': { webp: '/webp/Nord vpn.webp', fallback: '/Nord vpn.jpg' },
      'texting app': { webp: '/webp/Texting app.webp', fallback: '/Texting app.jpg' },
      'textingapp': { webp: '/webp/Texting app.webp', fallback: '/Texting app.jpg' }
    }
    return imageMap[category?.toLowerCase()] || null
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
    
    switch (category?.toLowerCase()) {
      case 'social': case 'facebook': return <FaFacebook className="text-blue-600 text-3xl" />
      case 'instagram': return <FaInstagram className="text-pink-500 text-3xl" />
      case 'twitter': return <FaTwitter className="text-sky-500 text-3xl" />
      case 'tiktok': return <FaTiktok className="text-black text-3xl" />
      case 'linkedin': return <FaLinkedin className="text-blue-700 text-3xl" />
      default: return <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs">{category?.charAt(0)?.toUpperCase()}</div>
    }
  }

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'social': case 'facebook': return 'bg-blue-50 border-blue-200'
      case 'instagram': return 'bg-pink-50 border-pink-200'
      case 'twitter': case 'x': return 'bg-sky-50 border-sky-200'
      case 'tiktok': return 'bg-gray-50 border-gray-200'
      case 'linkedin': return 'bg-blue-50 border-blue-200'
      case 'snapchat': return 'bg-yellow-50 border-yellow-200'
      case 'gmail': return 'bg-red-50 border-red-200'
      case 'expressvpn': case 'nordvpn': case 'hmavpn': case 'piavpn': case 'pvanishvpn': case 'surfshark': case 'vpn': return 'bg-green-50 border-green-200'
      case 'proxy': return 'bg-purple-50 border-purple-200'
      case 'texting app': case 'textingapp': return 'bg-indigo-50 border-indigo-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  // Filter logs based on search term
  const filteredLogs = logs.filter(log => {
    const searchLower = searchTerm.toLowerCase()
    return (
      log.logName?.toLowerCase().includes(searchLower) ||
      log.description?.toLowerCase().includes(searchLower) ||
      log.category?.toLowerCase().includes(searchLower)
    )
  })

  const groupedLogs = filteredLogs.reduce((acc, log) => {
    const category = log.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(log)
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>

        {Object.keys(groupedLogs).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No logs available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedLogs).map(([category, categoryLogs]) => (
              <div key={category} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  {getCategoryIcon(category)}
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">{category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categoryLogs.map((log) => (
                    <div 
                      key={log._id} 
                      onClick={() => handleViewDetails(log)}
                      className={`${getCategoryColor(category)} p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {getCategoryImage(category) && (
                          <picture>
                            <source srcSet={getCategoryImage(category).webp} type="image/webp" />
                            <img 
                              src={getCategoryImage(category).fallback} 
                              alt={category} 
                              className="w-10 h-10 object-cover rounded-lg" 
                            />
                          </picture>
                        )}
                        <div className="flex-1">
                          <span className="text-lg font-semibold block">{log.logName}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{category}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-2 text-sm">{log.description}</p>
                      <p className="text-sm text-blue-600 mb-3">
                        Available: {log.availableQuantity || log.accounts?.length || log.availableAccounts || log.stock || 0} accounts
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">₦{log.price}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails(log)
                          }}
                          className="px-3 py-1 rounded text-sm bg-black text-white hover:bg-gray-800"
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
    </div>
  );
}

export default Index2;
