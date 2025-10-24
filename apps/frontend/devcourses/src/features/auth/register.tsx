"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl: string = '/api/register/'; 
  const redirectToLogin = () => navigate('/login'); 

  const passwordsValidation = (password: string, password2: string ) => {
    if (password.length < 6 ||
        password.length > 12 ||
        !/\d/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
        ) {
          setErrorMessage(
            "La contraseña debe tener entre 6 y 12 caracteres y contener números, mayúsculas y minúsculas."
          );
        } else if (password !== password2) {
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
          const postResponse = await axios.post(apiUrl, {name, surname, email, password});

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
      if (axios.isAxiosError<{ message: string }>(error)) {
              setErrorMessage(error.response?.data.message || "Error en el registro.");
            } else if (error instanceof Error){
              setErrorMessage(error.message);
            } else {
              setErrorMessage("Error inesperado.");
            }
    };
  };

  return (
    <div >
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Registro</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
          <label className="block text-sm">Nombre</label>
          <input className="w-full border rounded p-2"  
            type="text"
            maxLength={15}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div>
          <label className="block text-sm">Apellido</label>
          <input className="w-full border rounded p-2"  
            type="text"
            maxLength={15}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          </div>
          <div>
          <label className="block text-sm">Email</label>
          <input className="w-full border rounded p-2"  
            type="text"
            maxLength={15}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div>
            <label className="block text-sm">Contraseña</label>
            <input className="w-full border rounded p-2"            
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="block text-sm">Repita la contraseña</label>
            <input className="w-full border rounded p-2" 
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <button 
            className="w-full py-2 rounded bg-indigo-600 text-white"
            disabled={loading}
            >
                {loading ? "Cargando..." : "Registrarme"}
            </button>
            {errorMessage && <div className="text-red-600 mb-2">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default Register;

