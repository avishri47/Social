import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUsers();
    }, 300); // debounce

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

  return (
    
    <div >
      <input
        type="text"
        placeholder="Search friends..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      {query && (
        <div style={styles.dropdown}>
          {loading && <div style={styles.item}>Searching...</div>}

          {!loading &&
            users.map((user) => (
              <div
                key={user.id}
                style={styles.item}
                onClick={() => {
                  window.location.href = `/profile/${user.id}`;
                }}
              >
                <img
                  src={user.profilePic}
                  alt={user.name}
                  style={styles.avatar}
                />

                <div>
                  <div>{user.name}</div>
                  <small>@{user.username}</small>
                </div>
              </div>
            ))}

          {!loading && users.length === 0 && (
            <div style={styles.item}>No users found</div>
          )}
        </div>
      )}
    </div>
    
    
  );
};

const styles = {
  container: {
    position: "relative",
    width: "350px",
    margin: "10px auto",
     
  },
  input: {
    width: "400%",
    padding: "19px 15px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    outline: "none"
  },
  
  dropdown: {
    position: "absolute",
    top: "45px",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1000,
    maxHeight: "400px",
    overflowY: "auto"
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #f1f1f1"
  },
  avatar: {
   width: "100%",
  maxWidth: "40px",
    height: "40px",
    borderRadius: "50%"
  }
};

export default SearchBox;