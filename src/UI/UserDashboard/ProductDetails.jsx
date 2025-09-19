import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaWallet, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const walletBalance = 250.75

  const products = [
    {
      id: 1,
      platform: 'Facebook',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+100 Friends',
      price: 25,
      stock: 12,
      description: 'High-quality Facebook account with real friends and engagement. Perfect for marketing and social media management.',
      features: ['Real friends', 'Active engagement', 'Aged account', 'Email included']
    },
    {
      id: 2,
      platform: 'Instagram',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+1K Followers',
      price: 35,
      stock: 15,
      description: 'Premium Instagram account with organic followers and high engagement rate.',
      features: ['Organic followers', 'High engagement', 'Verified email', 'Phone verified']
    }
  ]

  const getIcon = (platform) => {
    switch (platform) {
      case 'Facebook': return <FaFacebook className="text-blue-600 text-4xl" />
      case 'Instagram': return <FaInstagram className="text-pink-500 text-4xl" />
      case 'Twitter': return <FaTwitter className="text-sky-500 text-4xl" />
      case 'TikTok': return <FaTiktok className="text-black text-4xl" />
      case 'LinkedIn': return <FaLinkedin className="text-blue-700 text-4xl" />
      default: return <FaInstagram className="text-gray-500 text-4xl" />
    }
  }

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return <div>Product not found</div>
  }

  const totalPrice = product.price * quantity
  const canAfford = walletBalance >= totalPrice

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handlePurchase = async () => {
    if (!canAfford) return

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        id: Date.now(),
        product,
        quantity,
        totalPrice,
        purchaseDate: new Date().toISOString(),
        loginDetails: Array.from({ length: quantity }, (_, i) => ({
          email: `account${i + 1}@${product.platform.toLowerCase()}.com`,
          password: `Pass${Math.random().toString(36).substr(2, 8)}`,
          additionalInfo: product.platform === 'Facebook' ? 'Recovery email included' : 'Phone number included'
        }))
      }

      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      existingOrders.push(orderData)
      localStorage.setItem('orders', JSON.stringify(existingOrders))

      // Navigate to success page
      navigate(`/dashboard/purchase-success/${orderData.id}`)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/dashboard/user-products')}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft />
        <span>Back to Products</span>
      </button>

      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              {getIcon(product.platform)}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.platform}</h1>
                <p className="text-lg text-gray-600">{product.country} • {product.type}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What you get:</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{product.followers}</p>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Stock:</strong> {product.stock} accounts available
                </p>
              </div>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Purchase Details</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price per account:</span>
                    <span className="text-xl font-bold text-green-600">₦{product.price}</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity:
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">₦{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wallet Balance:</span>
                      <span className="font-semibold">₦{walletBalance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">After Purchase:</span>
                      <span className={`font-semibold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                        ₦{(walletBalance - totalPrice).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={!canAfford || isProcessing}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                  canAfford && !isProcessing
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isProcessing ? 'Processing...' : canAfford ? `Purchase ₦${totalPrice}` : 'Insufficient Balance'}
              </button>

              {!canAfford && (
                <p className="text-red-600 text-sm text-center">
                  You need ₦{(totalPrice - walletBalance).toFixed(2)} more to complete this purchase.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails