import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MenuManagement from "./pages/MenuManagement";
import PosSystem from "./pages/PosSystem";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Loyalty from "./pages/Loyalty";
import AiAssistant from "./pages/AiAssistant";
import Settings from "./pages/Settings";
import QrMenu from "./pages/QrMenu";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ style: { background: "#3E2723", color: "#FDF8F0" } }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu-qr" element={<QrMenu />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProtectedRoute feature="dashboard"><Dashboard /></ProtectedRoute>} />
            <Route path="menu" element={<ProtectedRoute feature="menu"><MenuManagement /></ProtectedRoute>} />
            <Route path="pos" element={<ProtectedRoute feature="pos"><PosSystem /></ProtectedRoute>} />
            <Route path="inventory" element={<ProtectedRoute feature="inventory"><Inventory /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute feature="reports"><Reports /></ProtectedRoute>} />
            <Route path="customers" element={<ProtectedRoute feature="customers"><Customers /></ProtectedRoute>} />
            <Route path="loyalty" element={<ProtectedRoute feature="loyalty"><Loyalty /></ProtectedRoute>} />
            <Route path="ai" element={<ProtectedRoute feature="ai"><AiAssistant /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute feature="settings"><Settings /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
