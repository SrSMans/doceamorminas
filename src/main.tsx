import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";
import { Login } from "./Login";
import { Jujuba } from "./Dashboard";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/candy" element={<Login />} />
          <Route path="/jujuba" element={<Jujuba />} />
        </Routes>
      </BrowserRouter>
    </ConvexAuthProvider>
  </StrictMode>,
);
