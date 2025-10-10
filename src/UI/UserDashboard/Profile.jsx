import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import API_URL from '../../Config'

function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    userName: user?.userName || ''
  })

  // Update formData when user data changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || ''
      })
    }
  }, [user])
  
  const userData = {
    userName: user?.userName || 'User',
    email: user?.email || '',
    memberSince: user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Profile updated successfully!')
        setIsEditing(false)
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      alert('Error updating profile')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button
          onClick={isEditing ? handleSave : () => {
            setFormData({ userName: user?.userName || '' })
            setIsEditing(true)
          }}
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
            <h2 className="text-xl font-bold text-gray-900">{userData.userName}</h2>
            <p className="text-gray-600">Member since {userData.memberSince}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="flex items-center space-x-3">
              <FaUser className="text-gray-400" />
              {isEditing ? (
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                  {userData.userName}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-gray-400" />
              <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                {userData.email}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-gray-400" />
              <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                {userData.memberSince}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile