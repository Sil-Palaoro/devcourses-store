import AppRoutes from "./routes/AppRoutes.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
