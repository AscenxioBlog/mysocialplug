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
      const reference = searchParams.get('reference')
      
      if (!reference) {
        navigate(`/payment-failed?reference=${reference || 'unknown'}`)
        return
      }

      try {
        const result = await apiService.verifyPayment(reference)
        navigate(`/payment-success?reference=${reference}&balance=${result.newBalance}`)
      } catch (verifyError) {
        // If verification fails, check if balance was updated
        try {
          const balanceResult = await apiService.getWalletBalance()
          navigate(`/payment-success?reference=${reference}&balance=${balanceResult.balance}`)
        } catch (balanceError) {
          navigate(`/payment-failed?reference=${reference}&error=verification_failed`)
        }
      }
      
    } catch (error) {
      const reference = searchParams.get('reference')
      navigate(`/payment-failed?reference=${reference}&error=unknown`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Payment</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export default PaymentCallback