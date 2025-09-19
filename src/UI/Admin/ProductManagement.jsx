import React, { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const products = [
    {
      id: 1,
      platform: 'Facebook',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+100 Friends',
      price: 25,
      stock: 12,
      sold: 45,
      status: 'active'
    },
    {
      id: 2,
      platform: 'Instagram',
      country: '🇺🇸 USA',
      type: 'Standard',
      followers: '+1K Followers',
      price: 35,
      stock: 15,
      sold: 32,
      status: 'active'
    },
    {
      id: 3,
      platform: 'TikTok',
      country: '🇺🇸 USA',
      type: 'Premium',
      followers: '+5K Followers',
      price: 80,
      stock: 0,
      sold: 18,
      status: 'out_of_stock'
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = platformFilter === 'all' || product.platform === platformFilter
    return matchesSearch && matchesPlatform
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{product.platform} - {product.type}</p>
                      <p className="text-sm text-gray-500">{product.country} • {product.followers}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">₦{product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{product.sold}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">₦{product.price * product.sold}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="View">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">In Stock</h3>
          <p className="text-3xl font-bold text-green-600">
            {products.filter(p => p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Out of Stock</h3>
          <p className="text-3xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₦{products.reduce((sum, p) => sum + (p.price * p.sold), 0)}
          </p>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>Twitter</option>
                  <option>TikTok</option>
                  <option>LinkedIn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" placeholder="🇺🇸 USA" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
                <input type="text" placeholder="+1K Followers" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                <input type="number" placeholder="35" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input type="number" placeholder="15" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Add Product
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement