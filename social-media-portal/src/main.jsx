import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SignIn from "./components/SignIn/SignIn";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; // ✅ ADD THIS
import ProfilePage from "./pages/Profile/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider> {/* ✅ WRAP EVERYTHING */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <ProtectedRoute> <App /> </ProtectedRoute> } />
        <Route path="/profile/:userId" element={<ProfilePage />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);