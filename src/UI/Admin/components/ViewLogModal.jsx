import React from 'react'

function ViewLogModal({ show, onClose, log }) {
  if (!show || !log) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Log Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Log Name</label>
            <p className="text-gray-900">{log.logName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{log.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <p className="text-gray-900">₦{log.price}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <p className="text-gray-900">{log.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <p className="text-gray-900">{log.password}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <p className="text-gray-900 capitalize">{log.category}</p>
          </div>
          {log.email && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{log.email}</p>
            </div>
          )}
          {log.twoFA && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">2FA Code</label>
              <p className="text-gray-900">{log.twoFA}</p>
            </div>
          )}
          {log.mailPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mail Password</label>
              <p className="text-gray-900">{log.mailPassword}</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewLogModal