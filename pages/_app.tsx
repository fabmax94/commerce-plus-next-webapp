import React from "react";
import { AppProps } from "next/app";
import { ContextAuthProvider } from "../contexts/auth";

import "../styles/index.css";
import { ContextLayoutProvider } from "../contexts/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ContextAuthProvider>
      <ContextLayoutProvider>
        <Component {...pageProps} />
      </ContextLayoutProvider>
    </ContextAuthProvider>
  );
}

export default App;
