import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import MainHome from './UI/Home/MainHome'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import MainContact from './UI/Contact/MainContact'
import Login from './UI/Login/Login'
import Register from './UI/Register/Register'
import ForgotPassword from './UI/Auth/ForgotPassword'
import ResetPassword from './UI/Auth/ResetPassword'
import MainDash from './UI/UserDashboard/MainDash'
import DashboardContent from './UI/UserDashboard/DashboardContent'
import Overview from './UI/UserDashboard/Overview'
import Profile from './UI/UserDashboard/Profile'
import Order from './UI/UserDashboard/Order'
import Product from './UI/UserDashboard/Product'
import ProductDetails from './UI/UserDashboard/ProductDetails'
import PurchaseSuccess from './UI/UserDashboard/PurchaseSuccess'
import AdminDashboard from './UI/Admin/AdminDashboard'
import AdminOverview from './UI/Admin/AdminOverview'
import UserManagement from './UI/Admin/UserManagement'
import OrderManagement from './UI/Admin/OrderManagement'
import ProductManagement from './UI/Admin/ProductManagement'
import Analytics from './UI/Admin/Analytics'
import LogDetails from './UI/LogDetails/LogDetails'
import PaymentCallback from './UI/PaymentCallback'

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/register', '/forgot-password'].includes(location.pathname) || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/reset-password');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/contact" element={<MainContact />} />
        <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/payment/callback" element={<PaymentCallback />} />

        <Route path="/log-details/:id" element={<LogDetails />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashboardContent /></ProtectedRoute>} >
          <Route index element={<Overview />} />
          <Route path="user-products" element={<Product />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="log-details/:id" element={<LogDetails />} />
          <Route path="purchase-success/:orderId" element={<PurchaseSuccess />} />
          <Route path="orders" element={<Order />} />
          <Route path="user-profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} >
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App