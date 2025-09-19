import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MainHome from './UI/Home/MainHome'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import MainContact from './UI/Contact/MainContact'
import Login from './UI/Login/Login'
import Register from './UI/Register/Register'
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

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/register'].includes(location.pathname) || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/contact" element={<MainContact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardContent />} >
          <Route index element={<Overview />} />
          <Route path="user-products" element={<Product />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="purchase-success/:orderId" element={<PurchaseSuccess />} />
          <Route path="orders" element={<Order />} />
          <Route path="user-profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<AdminDashboard />} >
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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App