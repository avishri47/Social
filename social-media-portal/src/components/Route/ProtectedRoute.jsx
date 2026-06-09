import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_USER_MANAGEMENT;
export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to="/signin" />;
}