"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import axios from "axios";
import { AxiosResponse } from "axios";
import { Button } from "../../components/Button";



function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/login'); 

  const passwordsValidation = (password: string, password2: string ) => {
    if (password.length < 6 ||
        password.length > 12 ||
        !/\d/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
        ) {
          setLoading(false);
          setErrorMessage(
            "La contraseña debe tener entre 6 y 12 caracteres y contener números, mayúsculas y minúsculas."
          );
        } else if (password !== password2) {
          setLoading(false);
          setErrorMessage("Las contraseñas no coinciden.");
        } else {
          setErrorMessage("");
          return true;
        }
  };

  
  const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
    try {        
        if (passwordsValidation(password, password2)) {     
            const postResponse = await api.post<AxiosResponse>("/register", { name, surname, email, password });
   
          if (postResponse.status === 201) {
            alert("El registro fue exitoso!");
            setErrorMessage(""); 
            setName("");
            setSurname("");         
            setEmail("");
            setPassword("");
            setPassword2("");
            redirectToLogin(); 
          }    
          }
    } catch (error: unknown) {
      setLoading(false);

      if (axios.isAxiosError<{ message: string }>(error)) {               
              setErrorMessage(error.response?.data.message || "Error al registrarse.");
            } else if (error instanceof Error){
              setErrorMessage(error.message);
            } else {
              setErrorMessage("Error inesperado.");
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

            {errorMessage && <div className="text-red-600 mb-2">{errorMessage}</div>}
        </form>
    </div>
  );
}

export default Register;
