import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

function Index2() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await fetch('https://sociallogs.onrender.com/api/logs')
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

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'social': case 'facebook': return <FaFacebook className="text-blue-600 text-3xl" />
      case 'instagram': return <FaInstagram className="text-pink-500 text-3xl" />
      case 'twitter': return <FaTwitter className="text-sky-500 text-3xl" />
      case 'tiktok': return <FaTiktok className="text-black text-3xl" />
      case 'linkedin': return <FaLinkedin className="text-blue-700 text-3xl" />
      case 'streaming': return <FaFacebook className="text-red-600 text-3xl" />
      case 'music': return <FaInstagram className="text-green-500 text-3xl" />
      default: return <FaFacebook className="text-gray-600 text-3xl" />
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

  const groupedLogs = logs.reduce((acc, log) => {
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
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-lg font-semibold">{log.logName}</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{category}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-2 text-sm">{log.description}</p>
                      <p className="text-sm text-gray-500 mb-3">{new Date(log.createdAt).toLocaleDateString()}</p>
                      
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
