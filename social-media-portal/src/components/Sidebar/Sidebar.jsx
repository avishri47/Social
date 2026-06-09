import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Dimmed backdrop overlay for mobile view */}
      <div 
        className={`overlay ${isOpen ? "visible" : ""}`} 
        onClick={onClose}
      ></div>

      {/* Main navigation drawer */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="item"><span>🏠</span> <span>Home</span></div>
        <div className="item"><span>🎬</span> <span>Shorts</span></div>
        <div className="item"><span>📺</span> <span>Subscriptions</span></div>
        <div className="item"><span>📚</span> <span>Library</span></div>
        <div className="item"><span>🕒</span> <span>History</span></div>
        <div className="item"><span>👍</span> <span>Liked</span></div>
      </aside>
    </>
  );
};

export default Sidebar;