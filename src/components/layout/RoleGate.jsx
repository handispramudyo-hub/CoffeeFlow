import { useAuth } from "../../contexts/AuthContext";

export default function RoleGate({ children, feature, fallback = null }) {
  const { hasPermission } = useAuth();
  if (feature && !hasPermission(feature)) return fallback;
  return children;
}
