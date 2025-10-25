import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function NavBar() {
    const { userRole, logout, isAuthenticated } = useAuth();
    return (
        <header>
            <h1>
                <Link to="/" title="DevCourses Store">
                  DevCourses Store
                </Link>
            </h1>
            <nav>
                <ul >
                    <li >
                      <Link title="Home" to="/">Home</Link>
                    </li>          
                    <li>
                      <Link to="#courses" title="Cursos">Cursos</Link>
                    </li>
                    <li>
                      <Link to="/cart" title="Carrito">Carrito</Link>
                    </li>
                    <li>
                      {isAuthenticated ? (
                        <>
                          {userRole === "admin" && <Link to="/admin">Admin</Link>}
                          <button onClick={logout}>Cerrar Sesión</button>
                        </>
                        ): (
                          <Link to="/login" title="Ingresar">Ingresar</Link>
                        )
                      }
                    </li>     
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;