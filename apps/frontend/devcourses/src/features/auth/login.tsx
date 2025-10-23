"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";


function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
      try {
        await login(email, password);
        navigate("/");
      } catch (error: unknown) {
        setLoading(false);
        if (axios.isAxiosError<{ message: string }>(error)) {
          setError(error?.response?.data?.message || "Error en la solicitud.");
        } else if (error instanceof Error){
          setError(error.message);
        } else {
          setError("Error inesperado.");
        }
      }
    };

    return (
      <>
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">               
            <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm">Email</label>
                  <input className="w-full border rounded p-2"
                    value={email}
                    placeholder="Email"
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>                
                  <label className="block text-sm">Contraseña</label>
                  <input className="w-full border rounded p-2"
                  placeholder="Contraseña"
                    value={password}
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />  
                </div>                
                <button 
                    className="w-full py-2 rounded bg-indigo-600 text-white"
                    disabled={loading}>
                        {loading ? "Ingresando..." : "Ingresar"}
                </button>                
            </form>
        </div>
      </>
    );
}

export default Login;
