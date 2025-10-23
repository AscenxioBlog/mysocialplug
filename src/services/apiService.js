import API_CONFIG from '../config/api.js'

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.token = localStorage.getItem('token')
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('token', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('token')
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers
      },
      credentials: 'include', // For cookie-based auth
      ...options
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth methods
  async register(userData) {
    const response = await this.request(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async login(credentials) {
    const response = await this.request(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async forgotPassword(email) {
    return this.request(API_CONFIG.ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  async resetPassword(token, password) {
    return this.request(API_CONFIG.ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ token, password })
    })
  }

  // Logs methods (products)
  async getLogs(category = null) {
    const url = category ? `${API_CONFIG.ENDPOINTS.LOGS}?category=${category}` : API_CONFIG.ENDPOINTS.LOGS
    return this.request(url)
  }

  async getLogDetails(id) {
    return this.request(API_CONFIG.ENDPOINTS.LOG_DETAILS.replace(':id', id))
  }

  async purchaseLog(id) {
    return this.request(API_CONFIG.ENDPOINTS.PURCHASE_LOG.replace(':id', id), {
      method: 'POST'
    })
  }

  // Wallet methods
  async getWalletBalance() {
    return this.request(API_CONFIG.ENDPOINTS.WALLET_BALANCE)
  }

  async addFunds(amount) {
    return this.request(API_CONFIG.ENDPOINTS.ADD_FUNDS, {
      method: 'POST',
      body: JSON.stringify({ amount })
    })
  }

  async verifyPayment(reference) {
    return this.request('/wallet/verify-payment', {
      method: 'POST',
      body: JSON.stringify({ reference })
    })
  }

  async getOrders() {
    return this.request('/orders')
  }

  // Admin methods
  async getAdminDashboard() {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_DASHBOARD)
  }

  async getAdminUsers() {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_USERS)
  }

  async getAdminUserDetails(id) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_USER_DETAILS.replace(':id', id))
  }

  async deleteUser(id) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_DELETE_USER.replace(':id', id), {
      method: 'DELETE'
    })
  }

  async updateUserWallet(id, amount, operation) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_UPDATE_WALLET.replace(':id', id), {
      method: 'PATCH',
      body: JSON.stringify({ amount, operation })
    })
  }

  async createLog(logData) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_CREATE_LOG, {
      method: 'POST',
      body: JSON.stringify(logData)
    })
  }

  async updateLog(id, logData) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_UPDATE_LOG.replace(':id', id), {
      method: 'PUT',
      body: JSON.stringify(logData)
    })
  }

  async deleteLog(id) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_DELETE_LOG.replace(':id', id), {
      method: 'DELETE'
    })
  }
}

export default new ApiService()