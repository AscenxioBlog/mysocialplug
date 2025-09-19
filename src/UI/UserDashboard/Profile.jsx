import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY 10001',
    memberSince: '2024'
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaEdit />
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
            <p className="text-gray-600">Member since {userData.memberSince}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  value={userData.name}
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  value={userData.email}
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" />
                <input
                  type="tel"
                  value={userData.phone}
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-gray-400" />
                <input
                  type="text"
                  value={userData.address}
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile