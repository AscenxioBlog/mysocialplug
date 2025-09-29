import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import apiService from '../../services/apiService'

function LogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [log, setLog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLogDetails()
  }, [id])

  const fetchLogDetails = async () => {
    try {
      const response = await apiService.getLogDetails(id)
      setLog(response.log)
    } catch (error) {
      setError('Failed to load log details')
      console.error('Error fetching log details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setPurchasing(true)
    try {
      const response = await apiService.purchaseLog(id)
      alert(`Purchase successful! Username: ${response.credentials.username}, Password: ${response.credentials.password}`)
      navigate('/dashboard/orders')
    } catch (error) {
      alert(error.message || 'Purchase failed')
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !log) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Log not found'}</p>
          <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{log.logName}</h1>
              <p className="text-gray-600 mb-6">{log.description}</p>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Category:</span>
                  <p className="font-medium capitalize">{log.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Created:</span>
                  <p className="font-medium">{new Date(log.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Price:</span>
                  <p className="text-2xl font-bold text-green-600">₦{log.price}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Purchase This Log</h3>
              <p className="text-gray-600 mb-6">
                Get instant access to this premium account with secure credentials.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-gray-900">₦{log.price}</span>
                </div>
                
                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>{purchasing ? 'Processing...' : `Purchase for ₦${log.price}`}</span>
                </button>
                
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center">
                    You need to <button onClick={() => navigate('/login')} className="text-blue-600 underline">login</button> to purchase
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogDetails