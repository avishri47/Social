import React, { useState, useEffect, useRef } from "react";
import "./ProfileDropdown.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";
import { useAuth } from "../context/AuthContext";

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, signout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Normalize gender value
  const gender = user?.profileGender?.toLowerCase();

  const avatarStyle = {
    backgroundImage: user?.avatar
      ? `url(${user.avatar})`
      : gender === "female"
      ? `url(https://cdn.vectorstock.com/i/1000v/44/13/grey-female-avatar-placeholder-vector-38594413.jpg)`
      : `url(https://cdn.vectorstock.com/i/1000v/54/69/male-user-icon-vector-8865469.jpg)`,
  };

  const handleLogout = async () => {
    setDropdownOpen(false);

    try {
      await userService.signout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      signout();

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
        style={avatarStyle}
      >
        {/* {!user?.avatar && (
          <span className="pd-avatar-placeholder">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        )} */}
      </div>

      {dropdownOpen && (
        <div className="pd-dropdown-card">
          <div className="pd-header">
            <p className="pd-user-name">
              {user?.name || "Guest User"}
            </p>

            <p className="pd-user-handle">
              @{user?.username || "guest"}
            </p>
          </div>

          <hr className="pd-divider" />

          <ul className="pd-menu-list">
            <li onClick={() => setDropdownOpen(false)}>
              👤 View Profile
            </li>

            <li onClick={() => setDropdownOpen(false)}>
              ⚙️ Settings
            </li>

            <li
              onClick={handleLogout}
              className="pd-logout-item"
            >
              🚪 Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;