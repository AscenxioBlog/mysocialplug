import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa'
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
  const [quantity, setQuantity] = useState(1)
  const [walletBalance, setWalletBalance] = useState(0)

  useEffect(() => {
    fetchLogDetails()
    if (isAuthenticated) {
      fetchWalletBalance()
    }
  }, [id, isAuthenticated])

  const fetchLogDetails = async () => {
    try {
      const response = await apiService.getLogDetails(id)
      console.log('=== LOG DETAILS API RESPONSE ===');
      console.log('Full Response:', response);
      console.log('Log Object:', response.log);
      console.log('All Log Keys:', Object.keys(response.log || {}));
      console.log('Accounts:', response.log?.accounts);
      console.log('Stock:', response.log?.stock);
      console.log('Available Accounts:', response.log?.availableAccounts);
      console.log('Accounts Length:', response.log?.accounts?.length);
      setLog(response.log)
    } catch (error) {
      setError('Failed to load log details')
      console.error('Error fetching log details:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchWalletBalance = async () => {
    try {
      const response = await apiService.getWalletBalance()
      console.log('=== WALLET BALANCE ===');
      console.log('Wallet API Response:', response);
      console.log('Balance:', response.balance);
      setWalletBalance(response.balance || 0)
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
    }
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const totalCost = log.price * quantity
    if (walletBalance < totalCost) {
      alert('Insufficient wallet balance. Please add funds to your wallet.')
      return
    }

    setPurchasing(true)
    try {
      console.log('=== PURCHASE REQUEST ===');
      console.log('Log ID:', id);
      console.log('Quantity:', quantity);
      console.log('Total Cost:', totalCost);
      console.log('Request URL:', `https://sociallogs.onrender.com/api/logs/${id}/purchase`);
      
      const response = await fetch(`https://sociallogs.onrender.com/api/logs/${id}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({ 
          quantity: quantity 
        })
      })

      console.log('=== PURCHASE RESPONSE ===');
      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json()
      console.log('=== FULL RESPONSE DATA ===');
      console.log('Complete Response:', JSON.stringify(data, null, 2));
      console.log('Response Keys:', Object.keys(data));
      console.log('Order Data:', data.order);
      console.log('Accounts:', data.accounts);
      console.log('Order ID:', data.orderId);
      console.log('Message:', data.message);
      
      if (response.ok) {
        // Create complete order data with credentials
        const completeOrderData = {
          _id: data.orderId,
          message: data.message,
          quantity: data.quantity,
          totalAmount: data.totalAmount,
          credentials: data.credentials,
          createdAt: new Date().toISOString(),
          ...data
        }
        
        // Save to localStorage for order history
        const existingOrders = JSON.parse(localStorage.getItem('orderCredentials') || '{}')
        existingOrders[data.orderId] = completeOrderData
        localStorage.setItem('orderCredentials', JSON.stringify(existingOrders))
        
        navigate(`/dashboard/purchase-success/${data.orderId}`, {
          state: { 
            orderData: completeOrderData
          }
        })
      } else {
        alert(data.message || 'Purchase failed')
      }
    } catch (error) {
      alert('Purchase failed. Please try again.')
      console.error('Purchase error:', error)
    } finally {
      setPurchasing(false)
    }
  }

  const increaseQuantity = () => {
    const maxStock = log?.availableQuantity || log?.accounts?.length || log?.availableAccounts || log?.stock || 0
    if (quantity < maxStock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const totalCost = log ? log.price * quantity : 0
  const canAfford = walletBalance >= totalCost
  const hasStock = (log?.availableQuantity || log?.accounts?.length || log?.availableAccounts || log?.stock || 0) > 0
  
  console.log('=== PURCHASE VALIDATION ===');
  console.log('Wallet Balance:', walletBalance);
  console.log('Total Cost:', totalCost);
  console.log('Can Afford:', canAfford);
  console.log('Has Stock:', hasStock);

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
                {/* <div>
                  <span className="text-sm text-gray-500">Created:</span>
                  <p className="font-medium">{new Date(log.createdAt).toLocaleDateString()}</p>
                </div> */}
                <div>
                  <span className="text-sm text-gray-500">Price per account:</span>
                  <p className="text-2xl font-bold text-green-600">₦{log.price}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Available accounts:</span>
                  <p className="font-medium text-blue-600">{log.availableQuantity || log.accounts?.length || log.availableAccounts || log.stock || 0} accounts</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Purchase This Log</h3>
              <p className="text-gray-600 mb-6">
                Get instant access to premium accounts with secure credentials.
              </p>
              
              <div className="space-y-4">
                {isAuthenticated && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wallet Balance:</span>
                    <span className="font-bold text-green-600">₦{walletBalance.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per account:</span>
                  <span className="font-bold text-gray-900">₦{log.price}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-lg font-semibold">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= (log?.availableQuantity || log?.accounts?.length || log?.availableAccounts || log?.stock || 0)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Max: {log?.availableQuantity || log?.accounts?.length || log?.availableAccounts || log?.stock || 0} accounts available</p>
                  </div>
                </div>
                
                <div className="flex justify-between border-t pt-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-gray-900">₦{totalCost}</span>
                </div>
                
                {!hasStock && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">Out of stock. No accounts available for purchase.</p>
                  </div>
                )}
                
                {isAuthenticated && !canAfford && hasStock && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">Insufficient balance. Please add funds to your wallet.</p>
                  </div>
                )}
                
                <button
                  onClick={handlePurchase}
                  disabled={purchasing || !canAfford || !hasStock}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>
                    {!hasStock ? 'Out of Stock' : 
                     purchasing ? 'Processing...' : 
                     `Purchase for ₦${totalCost}`}
                  </span>
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
    // </div>
  )
}

export default LogDetails