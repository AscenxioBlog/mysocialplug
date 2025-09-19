import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaShoppingCart, FaWallet, FaFilter, FaSearch } from 'react-icons/fa'

function Product() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [countryFilter, setCountryFilter] = useState('all')
  
  // Mock wallet balance
  const walletBalance = 250.75

  // Product data
  const products = [
    {
      id: 1,
      platform: 'Facebook',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+100 Friends',
      price: 25,
      stock: 12,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      platform: 'Instagram',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+1K Followers',
      price: 35,
      stock: 15,
      color: 'bg-pink-50 border-pink-200'
    },
    {
      id: 3,
      platform: 'Twitter',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+500 Followers',
      price: 20,
      stock: 9,
      color: 'bg-sky-50 border-sky-200'
    },
    {
      id: 4,
      platform: 'TikTok',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+2K Followers',
      price: 50,
      stock: 6,
      color: 'bg-gray-50 border-gray-200'
    },
    {
      id: 5,
      platform: 'LinkedIn',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+200 Connections',
      price: 30,
      stock: 5,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 6,
      platform: 'Instagram',
      country: '🇩🇪 Germany',
      type: 'Premium',
      followers: '+2K Followers',
      price: 60,
      stock: 2,
      color: 'bg-pink-50 border-pink-200'
    },
    {
      id: 7,
      platform: 'Facebook',
      country: '🇬🇧 UK',
      type: 'Premium',
      followers: '+500 Friends',
      price: 45,
      stock: 3,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 8,
      platform: 'TikTok',
      country: '🇮🇳 India',
      type: 'Premium',
      followers: '+5K Followers',
      price: 80,
      stock: 0,
      color: 'bg-gray-50 border-gray-200'
    }
  ]

  const getIcon = (platform) => {
    switch (platform) {
      case 'Facebook': return <FaFacebook className="text-blue-600 text-3xl" />
      case 'Instagram': return <FaInstagram className="text-pink-500 text-3xl" />
      case 'Twitter': return <FaTwitter className="text-sky-500 text-3xl" />
      case 'TikTok': return <FaTiktok className="text-black text-3xl" />
      case 'LinkedIn': return <FaLinkedin className="text-blue-700 text-3xl" />
      default: return <FaInstagram className="text-gray-500 text-3xl" />
    }
  }

  const handlePurchase = (product) => {
    navigate(`/dashboard/product-details/${product.id}`)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = platformFilter === 'all' || product.platform === platformFilter
    const matchesCountry = countryFilter === 'all' || product.country.includes(countryFilter)
    return matchesSearch && matchesPlatform && matchesCountry
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Products</h1>
          <p className="text-gray-600">Choose from our premium social media accounts</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
          <FaWallet />
          <span className="font-semibold">₦{walletBalance.toFixed(2)}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Platforms</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter">Twitter</option>
            <option value="TikTok">TikTok</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
          
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="India">India</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className={`${product.color} p-6 rounded-2xl border-2 hover:shadow-lg transition-all cursor-pointer`}>
            <div className="flex justify-between items-start mb-4">
              {getIcon(product.platform)}
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{product.type}</span>
            </div>
            
            <h3 className="font-bold text-lg mb-1">{product.platform}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.country}</p>
            <p className="text-gray-700 mb-2">{product.followers}</p>
            <p className="text-sm text-gray-500 mb-4">{product.stock} left</p>
            
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">₦{product.price}</span>
              <button
                onClick={() => handlePurchase(product)}
                disabled={product.stock === 0}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  product.stock === 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {product.stock === 0 ? 'Sold Out' : 'Buy Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Product