import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const PostCreator = ({ onPostSubmit }) => {
  const [newPostText, setNewPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
const {avatarUrl} = useAuth(); // Access avatarUrl from AuthContext
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPostText.trim() && !selectedImage) return;

    const createdPost = {
      id: Date.now(),
      author: {
        name: "Current User",
        username: "current_user",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        verified: false
      },
      timestamp: "Just now",
      content: newPostText,
      media: selectedImage,
      likes: 0,
      comments: 0,
      hasLiked: false
    };

    onPostSubmit(createdPost);
    setNewPostText("");
    setSelectedImage(null);
  };
  return (
    <div className="composer-card">
      <form onSubmit={handleSubmitPost}>
        <div className="composer-main-row">
          <img 
            src={avatarUrl} 
            alt="User profile" 
            className="post-user-avatar" 
          />
          <textarea
            placeholder="What's on your mind? Share an update or image..."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            rows="2"
            className="composer-textarea"
          />
        </div>

        {selectedImage && (
          <div className="composer-preview-container">
            <img src={selectedImage} alt="Upload preview" className="composer-img-preview" />
            <button 
              type="button" 
              className="composer-remove-img" 
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        )}

        <div className="composer-actions-row">
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            style={{ display: "none" }} 
          />
          
          <button 
            type="button" 
            className="composer-action-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="action-icon">🖼️</span>
            <span className="composer-btn-label">Media</span>
          </button>

          <button 
            type="submit" 
            className="composer-submit-btn"
            disabled={!newPostText.trim() && !selectedImage}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;