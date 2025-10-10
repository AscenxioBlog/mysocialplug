import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { FaCheck, FaCopy, FaDownload, FaEye, FaEyeSlash } from 'react-icons/fa'
import API_URL from '../../Config'

function PurchaseSuccess() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [order, setOrder] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showPasswords, setShowPasswords] = useState({})

  useEffect(() => {
    if (location.state?.orderData) {
      setOrder(location.state.orderData)
    } else {
      fetchOrderDetails()
    }
  }, [orderId, location.state])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok) {
        // Try to get credentials from localStorage
        const storedCredentials = JSON.parse(localStorage.getItem('orderCredentials') || '{}')
        const orderWithCredentials = storedCredentials[orderId] || data.order
        setOrder(orderWithCredentials)
      }
    } catch (error) {
      // Error handled silently
    }
  }

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const togglePasswordVisibility = (index) => {
    setShowPasswords(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const downloadCredentials = () => {
    const content = order.credentials.map((credentialString, index) => {
      const parts = credentialString.split('|')
      return `Account ${index + 1}:\nUsername: ${parts[0] || 'N/A'}\nPassword: ${parts[1] || 'N/A'}\nEmail: ${parts[2] || 'N/A'}\nMail Password: ${parts[3] || 'N/A'}\n2FA: ${parts[4] || 'N/A'}\nAdditional 1: ${parts[5] || 'N/A'}\nAdditional 2: ${parts[6] || 'N/A'}\n\n`
    }).join('')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `accounts_${orderId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">Purchase Successful!</h1>
        <p className="text-green-700">
          {order.message || 'Your accounts have been purchased successfully.'}
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-semibold">#{orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Message</p>
            <p className="font-semibold">{order.message}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Quantity</p>
            <p className="font-semibold">{order.credentials?.length || order.quantity} accounts</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Paid</p>
            <p className="font-semibold text-green-600">₦{order.totalAmount}</p>
          </div>
        </div>
      </div>

      {/* Login Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Account Login Details</h2>
          <button
            onClick={downloadCredentials}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaDownload />
            <span>Download</span>
          </button>
        </div>

        {/* Debug Info */}
        {/* <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
          <p><strong>Debug:</strong> Credentials Array Length: {order.credentials?.length || 0}</p>
          <p><strong>Order Keys:</strong> {Object.keys(order).join(', ')}</p>
          <p><strong>Raw Credentials:</strong> {JSON.stringify(order.credentials)}</p>
        </div> */}
        
        <div className="space-y-4">
          {order.credentials?.length > 0 ? order.credentials.map((credentialString, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">Account {index + 1}</h3>
                <button
                  onClick={() => copyToClipboard(credentialString, `credential-${index}`)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  {copiedIndex === `credential-${index}` ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  <span>Copy</span>
                </button>
              </div>
              <textarea
                value={credentialString}
                readOnly
                rows="3"
                className="w-full font-mono text-sm bg-white p-3 rounded border resize-none"
              />
            </div>
          )) : (
            <div className="text-center py-8">
              <p className="text-red-600">No account details found in the response.</p>
              <p className="text-sm text-gray-500 mt-2">Please contact support if this issue persists.</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Please save these login details securely. 
            We recommend downloading them and storing them in a safe place.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/dashboard/orders')}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          View Order History
        </button>
        <button
          onClick={() => navigate('/dashboard/user-products')}
          className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
        >
          Buy More Products
        </button>
      </div>
    </div>
  )
}

export default PurchaseSuccess