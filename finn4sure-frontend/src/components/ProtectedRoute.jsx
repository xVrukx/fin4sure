import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole) {
    const allowed = Array.isArray(allowedRole)
      ? allowedRole.includes(role)
      : role === allowedRole;

    if (!allowed) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

