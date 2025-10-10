import React, { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/apiService'
import FullPageLoader from '../components/FullPageLoader'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      // console.log('Auth loading started')
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      
      // Add delay to see loader
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (token && userData) {
        setUser(JSON.parse(userData))
        apiService.setToken(token)
      }
      // console.log('Auth loading finished')
      setLoading(false)
    }
    
    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    apiService.clearToken()
    localStorage.removeItem('user')
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  }

  if (loading) {
    return <FullPageLoader text="Initializing..." />
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext