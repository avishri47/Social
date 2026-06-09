import React from "react";
import "./RightBar.css";

const RightBar = () => {
  return (
    <aside className="rightBar">
      <h3 className="title">Trending</h3>

      <div className="card">🔥 AI & Tech News</div>
      <div className="card">⚡ React Updates</div>
      <div className="card">🎨 UI/UX Trends</div>
      <div className="card">💻 JavaScript Tips</div>
      <div className="card">🚀 Web Development</div>
    </aside>
  );
};

export default RightBar;