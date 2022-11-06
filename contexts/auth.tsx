import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const ContextAuth = React.createContext(null);

const ContextAuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logIn = (data) => {
    setCookie("token", data, { path: "/" });
    setToken(data);
  };

  const logOut = () => {
    removeCookie("token");
    setToken("");
  };

  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
    }
  }, []);

  return (
    <ContextAuth.Provider value={{ token, logIn, logOut }}>
      {children}
    </ContextAuth.Provider>
  );
};

export { ContextAuth, ContextAuthProvider };
