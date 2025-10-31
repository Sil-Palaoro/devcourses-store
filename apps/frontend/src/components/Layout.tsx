import React from "react";
import NavBar from "./NavBar.js";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-dark text-white">
            <NavBar />
            <main className="flex-grow pt-20 px-6">
                {children}
            </main>
            <footer className="border-t border-purpleNeon py-4 text-center text-sm text-gray-400">
                <div>© {new Date().getFullYear()} DevCourses Store by Silvina Palaoro</div>
            </footer>
        </div>
    );
};