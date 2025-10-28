"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Button } from "../../components/Button";


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
            <form className="space-y-4">
                <div>
                  <input 
                    className="w-full border border-fucsiaNeon/40 bg-zinc-800 text-white placeholder-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-fucsiaNeon/60 transition"
                    value={email}
                    placeholder="Email"
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>                
                  <input 
                    className="w-full border border-fucsiaNeon/40 bg-zinc-800 text-white placeholder-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-fucsiaNeon/60 transition"
                    placeholder="Contraseña"
                    value={password}
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />  
                </div>   
                <Button 
                  onClick={handleLogin}
                  label={loading ? "Ingresando.." : "Ingresar"}
                  disabled={loading}
                  isLoading={loading}
                  />             

                {error && <div className="text-red-600 mb-2">{error}</div>}         
            </form>
      </>
    );
}

export default Login;
