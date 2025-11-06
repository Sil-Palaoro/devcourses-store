import React, { useState } from "react";
import { AdminUsers } from "../components/admin/AdminUsers";
import { AdminCourses } from "../components/admin/AdminCourses";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "courses">("users");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] to-[#1a002b] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-fuchsia-400 drop-shadow-[0_0_6px_#d946ef]">
          Panel de Administración
        </h1>

        <div className="flex justify-center gap-6 mb-10">
          <button
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300  
              ${activeTab === "users" 
                ? "bg-fucsiaNeon-600 text-white shadow-[0_0_12px_#d946ef]"
                : "bg-[#2a1a40] text-fucsiaNeon-300 hover:shadow-[0_0_6px_#d946ef]"
              }`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 
              ${activeTab === "courses" 
                ? "bg-fucsiaNeon-600 text-white shadow-[0_0_12px_#d946ef]"
                : "bg-[#2a1a40] text-fucsiaNeon-300 hover:shadow-[0_0_6px_#d946ef]"
              }`}
            onClick={() => setActiveTab("courses")}
          >
            Cursos
          </button>
        </div>
        <div className="bg-[#120022] rounded-2xl p-6 shadow-[0_0_12px_#d946ef88]">
            {activeTab === "users" && <AdminUsers />}
            {activeTab === "courses" && <AdminCourses />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;