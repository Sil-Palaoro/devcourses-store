import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";
// import Home from "../features/courses/Home";
// import CourseDetail from "../features/courses/CourseDetail";
// import Login from "../features/auth/Login";
// import AdminPanel from "../features/admin/AdminPanel";
// import Cart from "../features/cart/Cart";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 
                <Route path="/" element={<Home />} /> 
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  }
                />*/}
            </Routes>
        </BrowserRouter>
    )
}