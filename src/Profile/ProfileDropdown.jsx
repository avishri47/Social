import { useState, useRef, useEffect } from "react";
import "./ProfileDropdown.css";
import userService from "../services/UserService";
import { useNavigate } from "react-router-dom";
export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const handleSignOut = async (e) => {
    try {
      const response = await userService.signout();
      console.log(response);
      setOpen(false);
      navigate("/signin");
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };
  return (
    <div className="profile-wrapper" ref={dropdownRef}>
      <div
        className="profile-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        A
      </div>

      {open && (
        <div className="dropdown-menu">
          <button className="dropdown-item">Create Account</button>
          <button className="dropdown-item">My Profile</button>
          <button className="dropdown-item">Settings</button>
          <button className="dropdown-item logout" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

