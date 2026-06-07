import { useState } from "react";
import "./Sidebar.css";
import FriendsList from "../FriendsList/FriendsList";
import Home from "../../pages/Home";

function Sidebar() {
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return  <Home />;

      case "Friends":
        return (
          <div className="friends-container">
            <FriendsList/>
          </div>
        );

      case "Reports":
        return <div className="page">Reports Page</div>;

      case "Settings":
        return <div className="page">Settings Page</div>;

      default:
        return <div className="page">Home Page</div>;
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <img
            src="https://i.pravatar.cc/100"
            className="profile-pic"
            alt="profile"
          />
        </div>

        <nav className="menu">
          <a href="#" onClick={() => setActivePage("Home")} className="menu-item">
            Home
          </a>

          <a href="#" onClick={() => setActivePage("Friends")} className="menu-item">
            Friends
          </a>

          <a href="#" onClick={() => setActivePage("Reports")} className="menu-item">
            Reports
          </a>

          <a href="#" onClick={() => setActivePage("Settings")} className="menu-item">
            Settings
          </a>
        </nav>
      </aside>

      {/* Right side content changes */}
      <div className="content-area">
        {renderPage()}
      </div>
    </div>
  );
}

export default Sidebar;