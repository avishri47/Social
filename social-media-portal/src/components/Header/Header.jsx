import React, { useState } from "react";
import "./Header.css";
import Sidebar from "../Sidebar/Sidebar";
import SearchBox from "../Search/SearchBox";
import ProfileDropdown from "../../Profile/ProfileDropdown";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        {/* Left: Logo + menu */}
        <div className="left">
          <div className="menu" onClick={toggleSidebar}>
            ☰
          </div>
          <div className="logo">Connecting World</div>
        </div>

        {/* Center: Search */}
        <SearchBox />

        {/* Right: Icons/Profile */}
        <div className="right">
          <div className="icon">🔔</div>
          
          {/* Cleaned up: Removed the broken wrapper div */}
          <ProfileDropdown />
        </div>
      </header>

      {/* Sidebar & Overlay Component */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;