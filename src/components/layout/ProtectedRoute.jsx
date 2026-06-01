import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children, feature }) {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-coffee-50">
        <Loader2 size={32} className="animate-spin text-coffee-500" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (feature && !hasPermission(feature)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
