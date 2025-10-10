import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'

function LogsTable({ logs, loading, onView, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          Loading logs...
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No logs found
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{log.logName}</p>
                      <p className="text-sm text-gray-500">{log.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">₦{log.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{log.availableQuantity || log.quantity || 1}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onView(log._id)}
                        className="text-blue-600 hover:text-blue-900 p-1" 
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => onEdit(log)}
                        className="text-green-600 hover:text-green-900 p-1" 
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => onDelete(log._id)}
                        className="text-red-600 hover:text-red-900 p-1" 
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LogsTable