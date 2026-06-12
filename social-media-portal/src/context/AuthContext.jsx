import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState(null);
  const DEFAULT_AVATARS = {
    male: 'https://cdn.vectorstock.com/i/1000v/54/69/male-user-icon-vector-8865469.jpg',     // High-quality free avatar API
    female: 'https://cdn.vectorstock.com/i/1000v/44/13/grey-female-avatar-placeholder-vector-38594413.jpg',
    other: 'https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg?w=768'
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const signin = (userData) => {
    console.log("Signing in user:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const signout = () => {
    setUser(null);
localStorage.clear(); 
  };


   const setAvatar = (updatedAvatarUrl) => {
    console.log("image url:", updatedAvatarUrl);
    setUser((prevUser) => ({
      ...prevUser,
      avatarUrl: updatedAvatarUrl
    }));
    localStorage.setItem("user", JSON.stringify({ ...user, avatarUrl: updatedAvatarUrl }));
    setNewAvatarUrl(updatedAvatarUrl);

  };

  
const avatarUrl =
  user?.avatarUrl ||
  user?.profilePicture ||
  user?.imageUrl ||
  user?.customAvatar ||
  DEFAULT_AVATARS[user?.gender?.toLowerCase()] ||
  DEFAULT_AVATARS.other;

  return (
    <AuthContext.Provider value={{ user, newAvatarUrl, signin, signout, avatarUrl, setAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);