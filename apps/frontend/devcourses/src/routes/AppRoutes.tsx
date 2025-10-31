import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { AdminRoute } from "./AdminRoute.js";
import Layout from "../components/Layout.js";
import Home from "../pages/Home.js";
// import CourseDetailPage from "../pages/CourseDetailPage";
// import Login from "../features/auth/Login";
// import AdminPanel from "../features/admin/AdminPanel";
// import Cart from "../features/cart/Cart";

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
{/*
                <Route 
                  path="/courses/:id" 
                  element={
                    <Layout>
                      <CourseDetailPage course={} />
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
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <Layout>
                        <AdminPanel />
                      </Layout>
                    </AdminRoute>
                  }
                />
                
                <Route path="/login" element={<Login />} />

                */}
            </Routes>
    )
}