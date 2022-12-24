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
    setProfile(undefined);
    localStorage.removeItem("profile");
  };

  const updateProfile = (newProfile: User) => {
    setProfile(newProfile);
    localStorage.setItem("profile", JSON.stringify(newProfile));
  };

  useEffect(() => {
    const profileLocalStorage = localStorage.getItem("profile");
    if (cookies.token && profileLocalStorage) {
      setToken(cookies.token);
      setProfile(JSON.parse(profileLocalStorage));
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
