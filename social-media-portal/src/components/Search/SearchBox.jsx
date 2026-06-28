import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBox.css";
import { useAuth } from "../../context/AuthContext";
import  profileService  from "../../services/ProfileService";
const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
    const {user,setUser} = useAuth();
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
     

      const response = await profileService.searchPeople(query, user.userId);
      console.log(response);
      setUsers(response);
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
          onChange={(e) => {setQuery(e.target.value);
            console.log("Search query:", e.target.value);
          }
          }
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
            users?.map((user) => (
              <div
                key={user.userId}
                className="search-item"
                role="button"
                tabIndex={0}
                onClick={() => handleProfileNavigation(user.userId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    console.log("Navigating to profile of userId:", user.userId);
                    handleProfileNavigation(user.userId);
                  }
                }}
              >
                <img
                  src={user.avatarUrl || null}
                  alt={user.fName}
                  className="search-avatar"
                  onError={(e) => {
                    e.target.src = null;
                  }}
                />

                <div className="search-item-content">
                  <div className="search-profile-name">{user.fName} {user.lName}</div>
                  <div className="search-profile-handle">@{user.status}</div>
                </div>
              </div>
            ))}

          {!loading && users?.length === 0 && (
            <div className="search-status-msg">No Person found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;