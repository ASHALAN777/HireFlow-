import { createContext, useEffect, useState } from "react";
import api from "@/api/api";

export const AuthContext = createContext({
  user: null,
  loading: true,
  Login: (userData) => {},
  Logout: () => {},
});

function AuthProvider({ children }) {
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const Login = (userData) => {
    setUser(userData);
  };

  const Logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, Login , Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
