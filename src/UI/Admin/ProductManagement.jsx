import React, { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedLog, setSelectedLog] = useState(null)
  const [updateForm, setUpdateForm] = useState({
    logName: '',
    description: '',
    price: '',
    username: '',
    password: '',
    category: ''
  })
  const [bulkForm, setBulkForm] = useState({
    logName: '',
    description: '',
    price: '',
    category: '',
    accounts: [{
      username: '',
      password: '',
      email: '',
      twoFA: '',
      mailPassword: ''
    }]
  })

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

  const openUpdateModal = (product) => {
    setSelectedLog(product)
    setUpdateForm({
      logName: `${product.platform} - ${product.type}`,
      description: `${product.country} • ${product.followers}`,
      price: product.price,
      username: '',
      password: '',
      category: product.platform.toLowerCase()
    })
    setShowUpdateModal(true)
  }

  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value })
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://sociallogs.onrender.com/api/admin/logs/${selectedLog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(updateForm)
      })
      
      if (response.ok) {
        alert('Log updated successfully!')
        setShowUpdateModal(false)
        // Refresh the products list here
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to update log')
      }
    } catch (error) {
      console.error('Error updating log:', error)
      alert('Error updating log')
    }
  }

  const handleBulkFormChange = (e) => {
    setBulkForm({ ...bulkForm, [e.target.name]: e.target.value })
  }

  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = [...bulkForm.accounts]
    updatedAccounts[index][field] = value
    setBulkForm({ ...bulkForm, accounts: updatedAccounts })
  }

  const addAccount = () => {
    setBulkForm({
      ...bulkForm,
      accounts: [...bulkForm.accounts, {
        username: '',
        password: '',
        email: '',
        twoFA: '',
        mailPassword: ''
      }]
    })
  }

  const removeAccount = (index) => {
    const updatedAccounts = bulkForm.accounts.filter((_, i) => i !== index)
    setBulkForm({ ...bulkForm, accounts: updatedAccounts })
  }

  const handleBulkSubmit = async (e) => {
    e.preventDefault()
    try {
      // Create multiple logs with the same product details but different credentials
      const promises = bulkForm.accounts.map(account => 
        fetch('https://sociallogs.onrender.com/api/admin/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include',
          body: JSON.stringify({
            logName: bulkForm.logName,
            description: bulkForm.description,
            price: parseInt(bulkForm.price),
            username: account.username,
            password: account.password,
            category: bulkForm.category,
            email: account.email,
            twoFA: account.twoFA,
            mailPassword: account.mailPassword
          })
        })
      )
      
      const results = await Promise.all(promises)
      const successCount = results.filter(r => r.ok).length
      
      alert(`Successfully created ${successCount} out of ${bulkForm.accounts.length} products!`)
      setShowAddModal(false)
      setBulkForm({
        logName: '',
        description: '',
        price: '',
        category: '',
        accounts: [{
          username: '',
          password: '',
          email: '',
          twoFA: '',
          mailPassword: ''
        }]
      })
    } catch (error) {
      console.error('Error creating bulk products:', error)
      alert('Error creating products')
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
                      <button 
                        onClick={() => openUpdateModal(product)}
                        className="text-green-600 hover:text-green-900 p-1" 
                        title="Edit"
                      >
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

      {/* Bulk Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Add Products</h3>
            <form onSubmit={handleBulkSubmit}>
              {/* Shared Product Details */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Product Details (Shared)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input 
                      type="text" 
                      name="logName"
                      value={bulkForm.logName}
                      onChange={handleBulkFormChange}
                      placeholder="Instagram Premium Account"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                    <input 
                      type="number" 
                      name="price"
                      value={bulkForm.price}
                      onChange={handleBulkFormChange}
                      placeholder="500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      name="description"
                      value={bulkForm.description}
                      onChange={handleBulkFormChange}
                      placeholder="Premium Instagram account with followers"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      name="category"
                      value={bulkForm.category}
                      onChange={handleBulkFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="social">Social Media</option>
                      <option value="streaming">Streaming</option>
                      <option value="music">Music</option>
                      <option value="gaming">Gaming</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Account Credentials */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800">Account Credentials</h4>
                  <button
                    type="button"
                    onClick={addAccount}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
                  >
                    + Add Account
                  </button>
                </div>
                
                <div className="space-y-4">
                  {bulkForm.accounts.map((account, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-gray-700">Account {index + 1}</h5>
                        {bulkForm.accounts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAccount(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
                          <input 
                            type="text" 
                            value={account.username}
                            onChange={(e) => handleAccountChange(index, 'username', e.target.value)}
                            placeholder="username123"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
                          <input 
                            type="text" 
                            value={account.password}
                            onChange={(e) => handleAccountChange(index, 'password', e.target.value)}
                            placeholder="password123"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                          <input 
                            type="email" 
                            value={account.email}
                            onChange={(e) => handleAccountChange(index, 'email', e.target.value)}
                            placeholder="user@email.com"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">2FA Code</label>
                          <input 
                            type="text" 
                            value={account.twoFA}
                            onChange={(e) => handleAccountChange(index, 'twoFA', e.target.value)}
                            placeholder="123456"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Mail Password</label>
                          <input 
                            type="text" 
                            value={account.mailPassword}
                            onChange={(e) => handleAccountChange(index, 'mailPassword', e.target.value)}
                            placeholder="mailpass123"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Create {bulkForm.accounts.length} Product(s)
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Log Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Update Log</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Log Name</label>
                <input 
                  type="text" 
                  name="logName"
                  value={updateForm.logName}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={updateForm.description}
                  onChange={handleUpdateChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                <input 
                  type="number" 
                  name="price"
                  value={updateForm.price}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  name="username"
                  value={updateForm.username}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="text" 
                  name="password"
                  value={updateForm.password}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category"
                  value={updateForm.category}
                  onChange={handleUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="streaming">Streaming</option>
                  <option value="social">Social Media</option>
                  <option value="music">Music</option>
                  <option value="gaming">Gaming</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Update Log
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement