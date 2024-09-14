import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, fetchUserData } from "../services/api";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // debugger;
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token).then((userData) => setUser(userData));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await loginUser(username, password);
      setUser(userData.user);
      console.log(userData.user, "userdataq");

      localStorage.setItem("token", userData.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const userData = await registerUser(username, password);
      setUser(userData.user);
      localStorage.setItem("token", userData.token);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
