import React from 'react'

function EditLogModal({ show, onClose, updateForm, setUpdateForm, onSubmit }) {
  if (!show) return null

  const handleFormChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value })
  }

  const handleAccountChange = (index, value) => {
    const updatedAccounts = [...(updateForm.accounts || [])]
    updatedAccounts[index] = value
    setUpdateForm({ ...updateForm, accounts: updatedAccounts })
  }

  const addAccount = () => {
    setUpdateForm({
      ...updateForm,
      accounts: [...(updateForm.accounts || []), '']
    })
  }

  const removeAccount = (index) => {
    const updatedAccounts = (updateForm.accounts || []).filter((_, i) => i !== index)
    setUpdateForm({ ...updateForm, accounts: updatedAccounts })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Update Product</h3>
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
                  value={updateForm.logName}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={updateForm.description}
                  onChange={handleFormChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input 
                  type="text" 
                  name="category"
                  value={updateForm.category}
                  onChange={handleFormChange}
                  placeholder="Enter platform (e.g., Facebook, Instagram, TikTok)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
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
              {(updateForm.accounts || []).map((account, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-700">Account {index + 1}</h5>
                    {(updateForm.accounts || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAccount(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Details
                    </label>
                    <textarea
                      value={account}
                      onChange={(e) => handleAccountChange(index, e.target.value)}
                      placeholder={`Paste account details here:
username:user@email.com:password123:2FA123:mailpass123`}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: username:email:password:2fa:mailpassword
                    </p>
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
              Update Product
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

export default EditLogModal