import { createRoot } from "react-dom/client";
import App from "./app/App";
import { AdminApp } from "./admin/AdminApp";
import "./styles/index.css";

const isAdmin = window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")!).render(
  isAdmin ? <AdminApp /> : <App />
);
