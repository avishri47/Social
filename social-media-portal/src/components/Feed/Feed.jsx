import React, { useState } from "react";
import "./Feed.css";
import PostCreator from "../PostCreator/PostCreator";

const INITIAL_FEEDS = [
  {
    id: 1,
    author: {
      name: "Alex Rivera",
      username: "alex_ventures",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      verified: true
    },
    timestamp: "2 hours ago",
    content: "Just captured this incredible view over the valley during my weekend hike. Nature never ceases to amaze me! 🏔️✨ #adventure #hiking #explore",
    media: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    likes: 124,
    comments: 18,
    hasLiked: false
  }
];

const STORIES = [
  { id: 1, name: "Your Story", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", isUser: true },
  { id: 2, name: "alex_v", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { id: 3, name: "james_k", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" }
];

const Feed = () => {
  const [posts, setPosts] = useState(INITIAL_FEEDS);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            hasLiked: !post.hasLiked,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  // Callback function triggered whenever PostCreator pushes a new post object up
  const handleAddNewPost = (newPostObj) => {
    setPosts([newPostObj, ...posts]);
  };

  return (
    <div className="feed-layout-container">
      {/* STORIES CAROUSEL TRACK */}
      <div className="stories-tray">
        {STORIES.map((story) => (
          <div key={story.id} className="story-node">
            <div className={`story-ring ${story.isUser ? "user-story" : ""}`}>
              <img src={story.avatar} alt={story.name} />
              {story.isUser && <span className="story-add-badge">+</span>}
            </div>
            <span className="story-label">{story.name}</span>
          </div>
        ))}
      </div>

      {/* MODULAR POST CREATOR COMPONENT */}
      <PostCreator onPostSubmit={handleAddNewPost} />

      {/* MAIN POSTS STREAM */}
      <main className="posts-stream">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <header className="post-header">
              <img src={post.author.avatar} alt={post.author.name} className="post-user-avatar" />
              <div className="post-meta-block">
                <div className="post-author-name">
                  {post.author.name}
                  {post.author.verified && <span className="verified-badge">✓</span>}
                </div>
                <div className="post-author-handle">@{post.author.username} • {post.timestamp}</div>
              </div>
              <button className="post-more-btn">•••</button>
            </header>

            <div className="post-body-text">
              <p>{post.content}</p>
            </div>

            {post.media && (
              <div className="post-media-frame">
                <img src={post.media} alt="Post asset" loading="lazy" />
              </div>
            )}

            <footer className="post-actions-footer">
              <div className="action-buttons-group">
                <button 
                  className={`action-btn like-btn ${post.hasLiked ? "liked" : ""}`}
                  onClick={() => handleLike(post.id)}
                >
                  <span className="action-icon">{post.hasLiked ? "❤️" : "🤍"}</span>
                  <span className="action-counter">{post.likes}</span>
                </button>

                <button className="action-btn comment-btn">
                  <span className="action-icon">💬</span>
                  <span className="action-counter">{post.comments}</span>
                </button>

                <button className="action-btn share-btn">
                  <span className="action-icon">🚀</span>
                </button>
              </div>

              <button className="action-btn bookmark-btn">
                <span className="action-icon">🔖</span>
              </button>
            </footer>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Feed;