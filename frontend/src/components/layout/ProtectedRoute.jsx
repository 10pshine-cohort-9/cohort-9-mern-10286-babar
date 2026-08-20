import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../services/token.service";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const token = getToken();

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;