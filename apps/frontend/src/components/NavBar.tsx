import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import { Button } from "./Button.js";
import { Modal } from "./Modal.js";
import Login from "../features/auth/login.js";
import Register from "../features/auth/register.js";


function NavBar() {
    const { userRole, logout, isAuthenticated } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);


    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-dark/95 backdrop-blur-sm border-b border-transparent shadow-md">
           <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-neon drop-shadow-[0_0_10px_rgba(255,0,255,0.5)] hover:text-fucsiaNeon transition-colors">
                <Link to="/" title="DevCourses Store">
                  DevCourses Store
                </Link>
            </h1>
            <nav>
                <ul className="flex items-center gap-6 text-sm font-medium">
                    <li >
                      <Link 
                        title="Home" 
                        to="/" 
                        className="hover:text-fucsiaNeon transition-colors"
                        >
                          Home
                      </Link>
                    </li>          
                    <li>
                      <Link 
                        to="#courses" 
                        title="Cursos"
                        className="hover:text-fucsiaNeon transition-colors"
                        >
                          Cursos
                      </Link>
                    </li>                    

                    {isAuthenticated ? (
                      <>
                        <li>
                          <Link 
                            to="/cart" 
                            title="Carrito"
                            className="hover:text-fucsiaNeon transition-colors"
                            >
                              Carrito
                          </Link>
                        </li>  
                        {userRole === "admin" && (
                          <li>
                            <Link 
                              to="/admin"
                              className="hover:text-fucsiaNeon transition-colors"
                              >
                                Admin
                            </Link>
                          </li>
                        )} 
                        <li>
                          <Button label="Cerrar sesión" disabled={false} onClick={logout} />
                        </li>
                      </>
                      ): (
                        <>
                          <li>
                            <Button label="Ingresar" disabled={false} onClick={() => setIsLoginOpen(true)} />
                          </li>
                          <li>
                            <Button label="Registrarme" disabled={false} onClick={() => setIsRegisterOpen(true)}  />
                          </li>
                        </>
                      )
                    }
              
                </ul>
            </nav>
          </div>
          <div className="h-1 bg-gradient-neon"></div>

          <Modal title="Iniciar sesión" isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
            <Login />
          </Modal>

          <Modal title="Registro" isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
            <Register />
          </Modal>

        </header>
    );
};

export default NavBar;
