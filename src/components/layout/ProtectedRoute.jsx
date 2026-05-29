import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-coffee-800">
        Loading...
      </div>
    );

  // Jika tidak ada user (belum login), lempar ke halaman login
  if (!user) return <Navigate to="/login" />;

  // Jika ada user, tampilkan halaman yang diminta
  return children;
}
