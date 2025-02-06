import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import Login from "./pages/Login";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* App sert de layout avec Outlet */}
        <Route path="/dashboard/*" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="tables" element={<Tables />} /> {/* Tables est maintenant enfant de App */}
        </Route>

      </Routes>
    </Router>
  </React.StrictMode>
);
