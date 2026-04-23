import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // REMOVE the .tsx extension here
import "./index.css";

// Use a safer check for the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. Check your index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
