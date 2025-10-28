import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";
import Layout from "../components/Layout";
// import Home from "../pages/Home";
// import CourseDetail from "../features/courses/CourseDetail";
// import Login from "../features/auth/Login";
// import AdminPanel from "../features/admin/AdminPanel";
// import Cart from "../features/cart/Cart";

export default function AppRoutes() {
    return (
            <Routes>
                {/* 
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
                      <CourseDetail />
                    </Layout>
                  } 
                />

                <Route path="/login" element={<Login />} />

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
                />*/}
            </Routes>
    )
}