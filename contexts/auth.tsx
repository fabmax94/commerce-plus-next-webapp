import React, { useEffect, useState } from "react";

const ContextAuth = React.createContext(null);

const ContextAuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const logIn = (data) => {
    localStorage.setItem("token", data);
    setToken(data);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <ContextAuth.Provider value={{ token, logIn, logOut }}>
      {children}
    </ContextAuth.Provider>
  );
};

export { ContextAuth, ContextAuthProvider };
