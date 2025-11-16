"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import { useAuthModals } from "../../contexts/AuthModalContext";


function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { openLoginModal, closeModals } = useAuthModals();


  const passwordsValidation = (password: string, password2: string ) => {
    if (password.length < 6 ||
        password.length > 12 ||
        !/\d/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
        ) {
          setLoading(false);
          setError(
            "La contraseña debe tener entre 6 y 12 caracteres y contener números, mayúsculas y minúsculas."
          );
        } else if (password !== password2) {
          setLoading(false);
          setError("Las contraseñas no coinciden.");
        } else {
          setError("");
          return true;
        }
  };

  
  const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    try {        
        if (passwordsValidation(password, password2)) {     
          await register(name, surname, email, password); 
          
          console.log("registro exitoso");
          alert("El registro fue exitoso!");
          setError(""); 
          setName("");
          setSurname("");         
          setEmail("");
          setPassword("");
          setPassword2("");
          closeModals(); 
          openLoginModal();              
        }
    } catch (error: unknown) {
      setLoading(false);

      if (axios.isAxiosError<{ message: string }>(error)) {               
              setError(error.response?.data.message || "Error al registrarse.");
            } else if (error instanceof Error){
              setError(error.message);
            } else {
              setError("Error inesperado.");
            }
    };
  };

  return (
    <div >
        <form className="space-y-4">
          <div>
          <input 
            placeholder="Nombre"
            className="w-full border border-fucsiaNeon/40 bg-zinc-800 text-white placeholder-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-fucsiaNeon/60 transition" 
            type="text"
            maxLength={15}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div>
          <input 
            placeholder="Apellido"
            className="w-full border border-fucsiaNeon/40 bg-zinc-800 text-white placeholder-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-fucsiaNeon/60 transition" 
            type="text"
            maxLength={15}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          </div>
          <div>
          <input 
            placeholder="Email"
            className="w-full border border-fucsiaNeon/40 bg-zinc-800 text-white placeholder-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-fucsiaNeon/60 transition"            type="text"
            maxLength={15}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div>
            <input 
              placeholder="Contraseña"
              className="w-full border border-fucsiaNeon/40 bg-zinc-800 text-white placeholder-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-fucsiaNeon/60 transition"           
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input 
              placeholder="Repita la contraseña"
              className="w-full border border-fucsiaNeon/40 bg-zinc-800 text-white placeholder-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-fucsiaNeon/60 transition"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <Button 
            label={loading ? "Cargando.." : "Registrarme"}
            onClick={handleRegister}
            disabled={loading}
            isLoading={loading}
          />
          <div>
            <p className="text-sm text-center mt-3">¿Ya tienes cuenta?{' '}</p>
            <button 
              onClick={openLoginModal}
              className="text-fucsiaNeon hover:underline"
            >Inicia sesión</button>
          </div>  

            {error && <div className="text-red-600 mb-2">{error}</div>}
        </form>
    </div>
  );
}

export default Register;
