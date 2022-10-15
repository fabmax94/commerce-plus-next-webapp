import React, { useState } from "react";
import Main from "../components/layouts/main";

const ContextLayout = React.createContext(null);

const ContextLayoutProvider = ({ children }) => {
  const [title, setTitle] = useState("");

  return (
    <ContextLayout.Provider value={{ setTitle }}>
      <Main title={title}>{children}</Main>
    </ContextLayout.Provider>
  );
};

export { ContextLayout, ContextLayoutProvider };
