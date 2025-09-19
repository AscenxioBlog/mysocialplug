import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaCheck, FaCopy, FaDownload, FaEye, FaEyeSlash } from 'react-icons/fa'

function PurchaseSuccess() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showPasswords, setShowPasswords] = useState({})

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const foundOrder = orders.find(o => o.id === parseInt(orderId))
    setOrder(foundOrder)
  }, [orderId])

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
    const content = order.loginDetails.map((login, index) => 
      `Account ${index + 1}:\nEmail: ${login.email}\nPassword: ${login.password}\nAdditional Info: ${login.additionalInfo}\n\n`
    ).join('')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${order.product.platform}_accounts_${order.id}.txt`
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
          Your {order.product.platform} accounts have been purchased successfully.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-semibold">#{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Platform</p>
            <p className="font-semibold">{order.product.platform}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Quantity</p>
            <p className="font-semibold">{order.quantity} accounts</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Paid</p>
            <p className="font-semibold text-green-600">₦{order.totalPrice}</p>
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

        <div className="space-y-4">
          {order.loginDetails.map((login, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-900 mb-3">Account {index + 1}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-mono text-sm bg-white p-2 rounded border">{login.email}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(login.email, `email-${index}`)}
                    className="ml-2 p-2 text-gray-500 hover:text-blue-600"
                  >
                    {copiedIndex === `email-${index}` ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Password</p>
                    <div className="flex items-center">
                      <p className="font-mono text-sm bg-white p-2 rounded border flex-1">
                        {showPasswords[index] ? login.password : '••••••••'}
                      </p>
                      <button
                        onClick={() => togglePasswordVisibility(index)}
                        className="ml-2 p-2 text-gray-500 hover:text-blue-600"
                      >
                        {showPasswords[index] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(login.password, `password-${index}`)}
                    className="ml-2 p-2 text-gray-500 hover:text-blue-600"
                  >
                    {copiedIndex === `password-${index}` ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Additional Info</p>
                  <p className="text-sm text-gray-800 bg-white p-2 rounded border">{login.additionalInfo}</p>
                </div>
              </div>
            </div>
          ))}
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