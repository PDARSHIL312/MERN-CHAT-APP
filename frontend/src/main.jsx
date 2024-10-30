import React from "react";
import { createRoot } from "react-dom/client"; // Correct import
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter is imported

// Select the root element
const container = document.getElementById("root");

// Create a root and render the App component inside it
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
