import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBox.css";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchUsers = async () => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `/api/users/search?query=${encodeURIComponent(query)}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileNavigation = (userId) => {
    window.location.href = `/profile/${userId}`;
  };

  return (
    <div className="search-container">
      {/* Material Input Field Box */}
      <div className="search-field-box">
        <span className="search-icon-left">🔍</span>
        <input
          type="text"
          placeholder="Search friends..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query && (
          <button className="search-clear-btn" onClick={() => setQuery("")}>
            ✕
          </button>
        )}
      </div>

      {/* Material Results Dropdown Drawer */}
      {query && (
        <div className="search-dropdown">
          {loading && (
            <div className="search-status-msg">
              <div className="search-spinner"></div>
              <span>Searching...</span>
            </div>
          )}

          {!loading &&
            users.map((user) => (
              <div
                key={user.id}
                className="search-item"
                role="button"
                tabIndex={0}
                onClick={() => handleProfileNavigation(user.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleProfileNavigation(user.id);
                  }
                }}
              >
                <img
                  src={user.profilePic || "https://via.placeholder.com/40"}
                  alt={user.name}
                  className="search-avatar"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40";
                  }}
                />

                <div className="search-item-content">
                  <div className="search-profile-name">{user.name}</div>
                  <div className="search-profile-handle">@{user.username}</div>
                </div>
              </div>
            ))}

          {!loading && users.length === 0 && (
            <div className="search-status-msg">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;