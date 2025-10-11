import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import apiService from '../../services/apiService'

function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const tx_ref = searchParams.get('tx_ref')
  const transaction_id = searchParams.get('transaction_id')

  useEffect(() => {
    verifyAndGetBalance()
  }, [])

  const verifyAndGetBalance = async () => {
    try {
      if (transaction_id && tx_ref) {
        try {
          const result = await apiService.verifyPayment(transaction_id, tx_ref)
          setBalance(result.newBalance)
        } catch (verifyError) {
          // If verification fails, get current balance
          const balanceResult = await apiService.getWalletBalance()
          setBalance(balanceResult.balance)
        }
      } else {
        // Just get current balance if no transaction details
        const balanceResult = await apiService.getWalletBalance()
        setBalance(balanceResult.balance)
      }
    } catch (error) {
      // If all fails, still show success page without balance
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful 🎉</h1>
        <p className="text-gray-600 text-lg mb-2">Your wallet has been credited successfully.</p>
        {loading ? (
          <div className="animate-pulse bg-gray-200 h-6 w-48 mx-auto rounded mb-6"></div>
        ) : balance && (
          <p className="text-green-600 font-semibold text-xl mb-6">
            New Balance: ₦{parseFloat(balance).toLocaleString()}
          </p>
        )}

        {/* Transaction Details */}
        {(tx_ref || transaction_id) && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Transaction Details:</h3>
            {tx_ref && (
              <div className="mb-2">
                <span className="text-sm text-gray-600">Reference: </span>
                <span className="font-mono text-sm text-gray-800">{tx_ref}</span>
              </div>
            )}
            {transaction_id && (
              <div>
                <span className="text-sm text-gray-600">Transaction ID: </span>
                <span className="font-mono text-sm text-gray-800">{transaction_id}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccess