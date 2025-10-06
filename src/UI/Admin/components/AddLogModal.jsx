import React from 'react'

function AddLogModal({ show, onClose, bulkForm, setBulkForm, onSubmit }) {
  if (!show) return null

  const handleFormChange = (e) => {
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
        email: '',
        password: '',
        twoFA: '',
        mailPassword: ''
      }]
    })
  }

  const removeAccount = (index) => {
    const updatedAccounts = bulkForm.accounts.filter((_, i) => i !== index)
    setBulkForm({ ...bulkForm, accounts: updatedAccounts })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Products</h3>
        <form onSubmit={onSubmit}>
          {/* Product Details */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Product Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  name="logName"
                  value={bulkForm.logName}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  placeholder="Premium Instagram account with followers"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
                <input 
                  type="number" 
                  name="followers"
                  value={bulkForm.followers}
                  onChange={handleFormChange}
                  placeholder="10000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category"
                  value={bulkForm.category}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="x">X (Twitter)</option>
                  <option value="email">Email</option>
                  <option value="vpn">VPN</option>
                  <option value="tiktok">TikTok</option>
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
                      <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                      <input 
                        type="email" 
                        value={account.email}
                        onChange={(e) => handleAccountChange(index, 'email', e.target.value)}
                        placeholder="user@email.com"
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
                      <label className="block text-xs font-medium text-gray-600 mb-1">2FA Code</label>
                      <input 
                        type="text" 
                        value={account.twoFA}
                        onChange={(e) => handleAccountChange(index, 'twoFA', e.target.value)}
                        placeholder="ABC123"
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
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLogModal