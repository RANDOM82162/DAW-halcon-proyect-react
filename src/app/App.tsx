import { useState, useMemo, useEffect } from "react";
import { RouterProvider } from "react-router";
import { createRouter } from "./routes";
import { getAuthToken, getUserData, removeAuthToken, removeUserData, logout as apiLogout } from "../api/auth";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    const token = getAuthToken();
    const userData = getUserData();
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUserName(userData.name || userData.email.split("@")[0]);
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    const userData = getUserData();
    setUserName(userData?.name || email.split("@")[0]);
  };

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  const router = useMemo(
    () => createRouter(isLoggedIn, handleLogin, handleLogout, userName),
    [isLoggedIn, userName]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 mb-4">
            <div className="w-8 h-8 border-4 border-purple-300 border-t-white rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}