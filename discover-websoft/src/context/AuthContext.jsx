import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  getMeRequest,
} from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // "loading" covers the brief moment on app start where we're checking
  // whether a saved token is still valid, before we know if someone is
  // logged in or not -- lets pages avoid flashing a logged-out state.
  const [loading, setLoading] = useState(true);

  // On first load, if a token was saved from a previous session, verify
  // it's still valid and restore the user -- otherwise clear it out.
  useEffect(() => {
    const token = localStorage.getItem("dw_token");

    if (!token) {
      setLoading(false);
      return;
    }

    getMeRequest()
      .then(({ user }) => setUser(user))
      .catch(() => {
        localStorage.removeItem("dw_token");
      })
      .finally(() => setLoading(false));
  }, []);

  async function register(formData) {
    const { token, user } = await registerRequest(formData);
    localStorage.setItem("dw_token", token);
    setUser(user);
    return user;
  }

  async function login(formData) {
    const { token, user } = await loginRequest(formData);
    localStorage.setItem("dw_token", token);
    setUser(user);
    return user;
  }

  function logout() {
    localStorage.removeItem("dw_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
