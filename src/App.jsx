import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout.jsx'
import Brands from './Component/Brands/Brands.jsx'
import Home from './Component/Home/Home.jsx'
import Cart from './Component/Cart/Cart.jsx'
import Products from './Component/Products/Products.jsx'
import Register from './Component/Register/Register.jsx'
import Login from './Component/Login/Login.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import Category from './Component/Category/Category.jsx'
import UserContextProvider, { UserContext } from './Context/UserContext.jsx'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import CartContextProvider, { CartContext } from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import Allorders from './Component/Allorders/Allorders.jsx'
import Checkout from './Component/Checkout/Checkout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Wishlist from './Component/Wishlist/Wishlist.jsx'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx'
import VerifyCode from './Component/VerifyCode/VerifyCode.jsx'
import ResetPassword from './Component/ResetPassword/ResetPassword.jsx'

function App() {
  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'category', element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'verify-code', element: <VerifyCode /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])
  let query = new QueryClient()

  return <QueryClientProvider client={query}>
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routers} />

        <Toaster />
      </UserContextProvider>
    </CartContextProvider>
  </QueryClientProvider>
}

export default App
