import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MenuManagement from "./pages/MenuManagement";
import PosSystem from "./pages/PosSystem";
import Inventory from "./pages/Inventory";
import AiAssistant from "./pages/AiAssistant"; // HARUS ADA INI

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{ style: { background: "#3E2723", color: "#FDF8F0" } }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="pos" element={<PosSystem />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="ai" element={<AiAssistant />} /> {/* HARUS ADA INI */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
