import { useState } from "react";

import "./Home.css";
import PostCreator from "../components/PostCreator/PostCreator";



function Home() {
  const [posts, setPosts] = useState([]);

  function handleAddPost(newPost) {
    setPosts([newPost, ...posts]); // add new post at top
  }

  return (
     <div>
  <header className="header"> </header>
    <div className="home-container">
    


      {/* Post input box */}
      <PostCreator onAddPost={handleAddPost} />

      {/* Posts feed */}
      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p>{post.text}</p>

            {post.type === "image" && (
              <img src={post.media} alt="post" />
            )}

            {post.type === "video" && (
              <video src={post.media} controls />
            )}

            <small>{post.time}</small>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}

export default Home;