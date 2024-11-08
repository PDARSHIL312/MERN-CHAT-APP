import React from "react";
import { createRoot } from "react-dom/client"; // Correct import
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter is imported
import { AuthContextProvider } from "./context/AuthContext";
import SocketContextProvider from "./context/SocketContextProvider";

// Select the root element
const container = document.getElementById("root");

// Create a root and render the App component inside it
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
