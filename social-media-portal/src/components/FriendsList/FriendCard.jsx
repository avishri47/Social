// src/components/FriendsList/FriendCard.jsx

import React from "react";

const FriendCard = ({ friend }) => {
  return (
    <div className="friend-card">
      <img src={friend.avatar} alt={friend.name} />

      <div className="friend-info">
        <h3>{friend.name}</h3>
        <p>Age: {friend.age}</p>
        <p>Location: {friend.location}</p>
      </div>
    </div>
  );
};

export default FriendCard;