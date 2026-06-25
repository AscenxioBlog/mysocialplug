import React, { useEffect, useState } from 'react'
import API_URL from '../../Config'

function RecentOrder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const formatCurrency = (value) => {
    const amount = Number(value || 0)

    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const truncateText = (value, maxLength = 28) => {
    if (!value) return 'Product'
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value
  }

  const formatBuyerName = (order) => {
    const rawName = order.userId?.userName || order.userName || order.userId?.email || 'User'
    const firstPart = rawName.split('@')[0].trim()

    if (firstPart.length <= 4) return `${firstPart}.`
    return `${firstPart.slice(0, 4)}..`
  }

  const getTimeAgo = (date) => {
    const now = new Date()
    const orderDate = new Date(date)
    const diffInMs = now - orderDate
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
    return orderDate.toLocaleDateString()
  }

  useEffect(() => {
    fetchRecentOrders()
  }, [])

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/recent`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      })
      const data = await response.json()
      setOrders(data.orders || data || [])
    } catch {
      // console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="rounded-[28px] bg-[#4d484d] px-6 py-4 text-center">
          <h3 className="text-xl font-black uppercase tracking-[0.2em] text-white sm:text-2xl">Recent Order</h3>
        </div>

        <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto] gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <div className="space-y-2 border-l border-gray-200 pl-4">
                  <div className="h-4 w-44 rounded bg-gray-200"></div>
                  <div className="h-4 w-56 rounded bg-gray-100"></div>
                </div>
                <div className="h-4 w-20 self-start rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <style>{`
        .recent-order-scroll {
          scrollbar-width: thin;
          scrollbar-color: #6b6570 #ece8ee;
        }

        .recent-order-scroll::-webkit-scrollbar {
          width: 10px;
        }

        .recent-order-scroll::-webkit-scrollbar-track {
          background: #ece8ee;
          border-radius: 9999px;
        }

        .recent-order-scroll::-webkit-scrollbar-thumb {
          background: #6b6570;
          border-radius: 9999px;
          border: 2px solid #ece8ee;
        }

        .recent-order-scroll::-webkit-scrollbar-thumb:hover {
          background: #4d484d;
        }
      `}</style>
      <div className="rounded-[28px] bg-[#4d484d] px-6 py-4 text-center shadow-sm">
        <h3 className="text-xl font-black uppercase tracking-[0.2em] text-white sm:text-2xl">Recent Order</h3>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-[24px] border border-gray-200 bg-white px-6 py-10 shadow-sm">
          <p className="text-center text-sm text-gray-500 sm:text-base">No recent orders</p>
        </div>
      ) : (
        <div className="rounded-[24px] border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <div className="recent-order-scroll h-[420px] overflow-y-auto pr-1">
            {orders.map((order, index) => {
              const productName = truncateText(
                order.logId?.logName || order.logName || order.productName || order.title || order.product?.platform
              )
              const price = formatCurrency(order.amount || order.price || order.total || order.totalPrice)

              return (
                <div
                  key={order._id || order.id || index}
                  className="grid grid-cols-[1fr_auto] gap-3 border-b border-gray-100 px-3 py-4 last:border-b-0 sm:px-5"
                >
                  <div className="min-w-0 border-l border-gray-200 pl-4">
                    <p className="truncate text-[15px] text-gray-700 sm:text-[17px]">
                      <span>{formatBuyerName(order)}, </span>
                      <span className="font-semibold text-[#c2185b]">just purchase</span>
                    </p>
                    <p className="truncate text-base text-gray-800 sm:text-[18px]">
                      <span>{productName}</span>
                      <span className="font-semibold text-gray-900">{price}</span>
                    </p>
                  </div>

                  <div className="min-w-[92px] self-start pt-1 text-right text-sm text-gray-500 sm:min-w-[120px] sm:text-base">
                    {getTimeAgo(order.createdAt)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentOrder
