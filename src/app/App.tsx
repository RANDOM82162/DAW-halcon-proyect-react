import { useState, useMemo } from "react";
import { RouterProvider } from "react-router";
import { createRouter } from "./routes";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserName(email.split("@")[0]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  const router = useMemo(
    () => createRouter(isLoggedIn, handleLogin, handleLogout, userName),
    [isLoggedIn, userName]
  );

  return <RouterProvider router={router} />;
}