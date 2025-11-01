import AppRoutes from "./routes/AppRoutes.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.js";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
