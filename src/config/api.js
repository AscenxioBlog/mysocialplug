const API_CONFIG = {
  BASE_URL: 'https://api.example.com', // Replace with your actual API base URL
  API_KEY: 'jR61y6iEwHvxaxSFndh6C0q07V174U',
  ENDPOINTS: {
    // User endpoints
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    USER_PROFILE: '/user/profile',
    
    // Product endpoints
    PRODUCTS: '/products',
    PRODUCT_DETAILS: '/products/:id',
    
    // Order endpoints
    ORDERS: '/orders',
    CREATE_ORDER: '/orders/create',
    ORDER_DETAILS: '/orders/:id',
    
    // Admin endpoints
    ADMIN_USERS: '/admin/users',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_ANALYTICS: '/admin/analytics'
  }
}

export default API_CONFIG