import API_CONFIG from '../config/api.js'

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.apiKey = API_CONFIG.API_KEY
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // User methods
  async login(credentials) {
    return this.request(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async register(userData) {
    return this.request(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  // Product methods
  async getProducts() {
    return this.request(API_CONFIG.ENDPOINTS.PRODUCTS)
  }

  async getProductDetails(id) {
    return this.request(API_CONFIG.ENDPOINTS.PRODUCT_DETAILS.replace(':id', id))
  }

  // Order methods
  async createOrder(orderData) {
    return this.request(API_CONFIG.ENDPOINTS.CREATE_ORDER, {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  }

  async getOrders() {
    return this.request(API_CONFIG.ENDPOINTS.ORDERS)
  }

  // Admin methods
  async getAdminUsers() {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_USERS)
  }

  async getAdminOrders() {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_ORDERS)
  }

  async getAdminProducts() {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_PRODUCTS)
  }

  async getAnalytics() {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN_ANALYTICS)
  }
}

export default new ApiService()