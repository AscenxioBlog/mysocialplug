import API_URL from '../Config'

const API_CONFIG = {
  BASE_URL: `${API_URL}/api`,
  ENDPOINTS: {
    // Auth endpoints
    REGISTER: '/auth',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    
    // Logs endpoints (products)
    LOGS: '/logs',
    LOG_DETAILS: '/logs/:id',
    PURCHASE_LOG: '/logs/:id/purchase',
    
    // Wallet endpoints
    WALLET_BALANCE: '/wallet/balance',
    ADD_FUNDS: '/wallet/add-funds',
    
    // Admin endpoints
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_USERS: '/admin/users',
    ADMIN_USER_DETAILS: '/admin/users/:id',
    ADMIN_DELETE_USER: '/admin/users/:id',
    ADMIN_UPDATE_WALLET: '/admin/users/:id/wallet',
    ADMIN_CREATE_LOG: '/admin/logs',
    ADMIN_UPDATE_LOG: '/admin/logs/:id',
    ADMIN_DELETE_LOG: '/admin/logs/:id'
  }
}

export default API_CONFIG