import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const DEFAULT_AVATARS = {
    male: 'https://cdn.vectorstock.com/i/1000v/54/69/male-user-icon-vector-8865469.jpg',     // High-quality free avatar API
    female: 'https://cdn.vectorstock.com/i/1000v/44/13/grey-female-avatar-placeholder-vector-38594413.jpg',
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
const avatarUrl = user?.customAvatar 
    ? user.customAvatar 
    : (DEFAULT_AVATARS[user?.gender?.toLowerCase()]);
  return (
    <AuthContext.Provider value={{ user, signin, signout, avatarUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);