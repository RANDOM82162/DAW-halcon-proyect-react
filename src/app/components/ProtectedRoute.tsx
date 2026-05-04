import { Navigate } from "react-router";
import { getAuthToken } from "../api/auth";

interface ProtectedRouteProps {
  element: React.ReactElement;
  isLoggedIn: boolean;
}

export function ProtectedRoute({ element, isLoggedIn }: ProtectedRouteProps) {
  const token = getAuthToken();
  
  // Check both local state and stored token
  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
