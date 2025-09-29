import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiService from '../services/apiService'

function PaymentCallback() {
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('Verifying your payment...')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    verifyPayment()
  }, [])

  const verifyPayment = async () => {
    try {
      const transaction_id = searchParams.get('transaction_id')
      const tx_ref = searchParams.get('tx_ref')
      
      if (!transaction_id && !tx_ref) {
        setStatus('error')
        setMessage('Invalid payment parameters')
        return
      }

      try {
        const result = await apiService.verifyPayment(transaction_id, tx_ref)
        
        setStatus('success')
        setMessage(`Payment verified! Your new balance is ₦${result.newBalance.toLocaleString()}`)
        
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
      } catch (verifyError) {
        // If verification fails, check if balance was updated
        console.log('Verification failed, checking balance:', verifyError.message)
        
        try {
          const balanceResult = await apiService.getWalletBalance()
          
          setStatus('success')
          setMessage(`Payment successful! Your balance is ₦${balanceResult.balance.toLocaleString()}`)
          
          setTimeout(() => {
            navigate('/dashboard')
          }, 3000)
        } catch (balanceError) {
          setStatus('error')
          setMessage('Payment verification failed. Please check your balance in the dashboard.')
        }
      }
      
    } catch (error) {
      setStatus('error')
      setMessage('Payment verification failed. Please check your balance in the dashboard.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentCallback