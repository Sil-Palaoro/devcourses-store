import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { AdminRoute } from "./AdminRoute.js";
import Layout from "../components/Layout.js";
import Home from "../pages/Home.js";
import CourseDetailPage from "../pages/CourseDetailPage";
import AdminPanel from "../pages/AdminPanel";
import Cart from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage"
import CheckoutSuccess from "../pages/checkout/CheckoutSuccess"
import CheckoutFailure from "../pages/checkout/CheckoutFailure"

export default function AppRoutes() {
    return (
            <Routes>
                 
                <Route 
                  path="/" 
                  element={
                  <Layout>
                    <Home />
                  </Layout>
                  } 
                /> 

                <Route 
                  path="/courses/:id" 
                  element={
                    <Layout>
                      <CourseDetailPage />
                    </Layout>
                  } 
                />


                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Cart />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CheckoutPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/checkout/success"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CheckoutSuccess />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/checkout/failure"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CheckoutFailure />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <Layout>
                        <AdminPanel />
                      </Layout>
                    </AdminRoute>
                  }
                />
                
               
            </Routes>
    )
}