import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModals } from "../contexts/AuthModalContext";
import { Button } from "./Button";


function NavBar() {
    const { userRole, logout, isAuthenticated } = useAuth();
    const { openLoginModal, openRegisterModal } = useAuthModals();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-dark/95 backdrop-blur-sm border-b border-transparent shadow-md">
           <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-neon drop-shadow-[0_0_10px_rgba(255,0,255,0.5)] hover:text-fucsiaNeon transition-colors">
                <HashLink 
                  to="/#home" 
                  title="DevCourses Store"
                >
                  DevCourses Store
                </HashLink>
            </h1>
            <nav>
                <ul className="flex items-center gap-6 text-sm font-medium">
                    <li >
                      <HashLink 
                        title="Home" 
                        to="/#home" 
                        className="hover:text-fucsiaNeon transition-colors"
                        >
                          Home
                      </HashLink>
                    </li>          
                    <li>
                      <HashLink smooth 
                        to="/#courses"  
                        title="Cursos"
                        className="hover:text-fucsiaNeon transition-colors"
                        >
                          Cursos
                      </HashLink>
                    </li>   

                    <li>
                      <HashLink smooth 
                        to="/#about-us"  
                        title="Sobre Nosotros"
                        className="hover:text-fucsiaNeon transition-colors"
                        >
                          Conocenos
                      </HashLink>
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
                            <Button label="Ingresar" disabled={false} onClick={openLoginModal} />
                          </li>
                          <li>
                            <Button label="Registrarme" disabled={false} onClick={openRegisterModal}  />
                          </li>
                        </>
                      )
                    }
              
                </ul>
            </nav>
          </div>
          <div className="h-1 bg-gradient-neon"></div>
        </header>
    );
};

export default NavBar;
