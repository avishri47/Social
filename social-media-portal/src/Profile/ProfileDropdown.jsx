import React, { useState, useEffect, useRef } from "react";
import "./ProfileDropdown.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // HTTP LOGOUT HANDLER
  const handleLogout = async () => {
    setDropdownOpen(false); // Instantly close the dropdown panel

    try {
      // 1. Fire the network HTTP request to your backend server API endpoint
      const response = await userService.signout(); // Call the signout function from UserService which makes the API call to backend

      if (response.ok) {
        console.log("Logged out successfully from backend server.");
      } else {
        console.warn("Backend session clearance returned an error status.");
      }
    } catch (error) {
      console.error("Network connection error encountered during logout:", error);
    } finally {
      // 2. Clear client-side application storage (Tokens, User Profiles, Settings)
      localStorage.removeItem("token");
      sessionStorage.clear();

      // 3. Kick the user out to your login routing page
      // If you are using React Router, use navigate("/login") instead!
      navigate("/signin");
    }
  };

  return (
    <div className="pd-container" ref={dropdownRef}>
      <div 
        className={`pd-avatar ${dropdownOpen ? "pd-active" : ""}`} 
        onClick={toggleDropdown}
        role="button"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <span className="pd-avatar-placeholder">U</span>
      </div>
      
      {dropdownOpen && (
        <div className="pd-dropdown-card">
          <div className="pd-header">
            <p className="pd-user-name">Current User</p>
            <p className="pd-user-handle">@current_user</p>
          </div>
          <hr className="pd-divider" />
          <ul className="pd-menu-list">
            <li onClick={() => setDropdownOpen(false)}>👤 View Profile</li>
            <li onClick={() => setDropdownOpen(false)}>⚙️ Settings</li>
            
            {/* Hooked up to the async network trigger function */}
            <li onClick={handleLogout} className="pd-logout-item">
              🚪 Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;