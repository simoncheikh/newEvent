import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Add user state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        console.log("Checking authentication...");
        const response = await fetch("http://localhost:3001/get-user-info", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
  
          console.log("Authentication successful. User info:", data);
  
          // Set authenticated and user upon successful login
          setAuthenticated(true);
          setUser(data);
  
          // Store authentication state in localStorage
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          console.log("Authentication failed.");
          setAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Check authentication error:", error);
      }
    };
  
    checkAuthentication();
  }, []);
  

  const login = async (userLogin, setShowAlert, setWarningText) => {
    try {
      const response = await fetch("http://localhost:3001/login/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const userInfo = data.user;

        setAuthenticated(true);
        setUser(userInfo);

        navigate(
          userInfo?.type === 1
            ? "/admin/Home"
            : userInfo.type === 2
            ? "/client/Home"
            : "/"
        ).then(() => {
          setShowAlert(true);
        });
      } else {
        const errorData = await response.json();
        setWarningText({ severity: "error", label: errorData.error });
        setShowAlert(true);
      }
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
      setShowAlert(true);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`http://localhost:3001/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setAuthenticated(false);
        setUser(null);
        navigate('/')
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, user, login, logout, navigate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { authenticated, user, login, logout, navigate } =
    useContext(AuthContext);

  return { authenticated, user, login, logout, navigate };
};
