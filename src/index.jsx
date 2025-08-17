import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "./global.css"
const clerkPubKey = "pk_test_ZGlyZWN0LXNwb25nZS04NC5jbGVyay5hY2NvdW50cy5kZXYk";

if (!clerkPubKey) {
  throw new Error("Missing Clerk publishable key. Check your .env file.");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ClerkProvider>
  </React.StrictMode>
);
