import React, { useState, useEffect } from 'react'
import { FiPlus, FiDollarSign, FiCreditCard } from 'react-icons/fi'

function Wallet() {
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    try {
      const response = await fetch('https://sociallogs.onrender.com/api/wallet/balance', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      const data = await response.json()
      setBalance(data.balance || 0)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const handleAddFunds = async (e) => {
    e.preventDefault()
    if (!amount || amount <= 0) return

    setLoading(true)
    try {
      const response = await fetch('https://sociallogs.onrender.com/api/wallet/add-funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({ amount: parseInt(amount) })
      })

      const data = await response.json()
      
      if (response.ok && data.paymentLink) {
        // Redirect to Flutterwave payment page
        window.location.href = data.paymentLink
      } else {
        alert(data.message || 'Failed to initialize payment')
      }
    } catch (error) {
      console.error('Error adding funds:', error)
      alert('Error adding funds')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Wallet</h1>
        
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-2">Current Balance</p>
              <h2 className="text-4xl font-bold">₦{balance.toLocaleString()}</h2>
            </div>
            <FiDollarSign className="w-16 h-16 text-blue-200" />
          </div>
        </div>

        {/* Add Funds Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <FiPlus className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-2xl font-semibold text-gray-800">Add Funds</h3>
          </div>
          
          <form onSubmit={handleAddFunds} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <FiCreditCard className="w-5 h-5 mr-2" />
                  Add Funds
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Wallet