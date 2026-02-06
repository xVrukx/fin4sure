import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Sync frontend auth with backend session
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Run once on app load / refresh
  useEffect(() => {
    fetchProfile();
  }, []);

  // Called after login
  function login(userData) {
    setUser(userData);
  }

  // Called on logout
  async function logout() {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "",
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}