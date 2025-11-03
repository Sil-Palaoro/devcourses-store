import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";


function App() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <CartProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </AuthModalProvider>
    </AuthProvider>
  )
}

export default App;
