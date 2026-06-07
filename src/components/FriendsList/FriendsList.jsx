// src/components/FriendsList/FriendsList.jsx

import React from "react";
import FriendCard from "./FriendCard";
import friends from "./data";
import "./FriendsList.css";

const FriendsList = () => {
  return (
    <div className="friends-container">
      <h3>Your Friends</h3>

      <div className="friends-grid">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;