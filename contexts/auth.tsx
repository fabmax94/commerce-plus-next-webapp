import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { User } from "../interfaces/user";

const ContextAuth = React.createContext(null);

const ContextAuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<User>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logIn = (response) => {
    const token = `Bearer ${response.access_token}`;
    setCookie("token", token, { path: "/" });
    localStorage.setItem("profile", JSON.stringify(response));
    setProfile(response);
    setToken(token);
  };

  const logOut = () => {
    removeCookie("token");
    setToken("");
  };

  const updateProfile = (newProfile: User) => {
    setProfile(newProfile);
    localStorage.setItem("profile", JSON.stringify(newProfile));
  };

  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
      setProfile(JSON.parse(localStorage.getItem("profile")));
    }
  }, []);

  return (
    <ContextAuth.Provider
      value={{ token, logIn, logOut, profile, updateProfile }}
    >
      {children}
    </ContextAuth.Provider>
  );
};

export { ContextAuth, ContextAuthProvider };
