import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const DEFAULT_AVATARS = {
    male:
      "https://cdn.vectorstock.com/i/1000v/54/69/male-user-icon-vector-8865469.jpg",
    female:
      "https://cdn.vectorstock.com/i/1000v/44/13/grey-female-avatar-placeholder-vector-38594413.jpg",
    other:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg?w=768",
  };

  const [user, setUser] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const signin = (userData) => {
    console.log("Signing in user:", userData);

    const updatedUser = {
      ...userData,
      avatarUrl:
        userData.avatarUrl ||
        userData.profilePicUrl ||
        userData.profilePicture ||
        userData.imageUrl,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const signout = () => {
    setUser(null);
    setNewAvatarUrl(null);
    localStorage.clear();
  };

  const setAvatar = (updatedAvatarUrl) => {
    console.log("Updating avatar:", updatedAvatarUrl);

    setUser((prevUser) => {
      if (!prevUser) {
        return {
          avatarUrl: updatedAvatarUrl,
        };
      }

      const updatedUser = {
        ...prevUser,
        avatarUrl: updatedAvatarUrl,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });

    setNewAvatarUrl(updatedAvatarUrl);
  };

  const avatarUrl =
    newAvatarUrl ||
    user?.avatarUrl ||
    user?.profilePicUrl ||
    user?.profilePicture ||
    user?.imageUrl ||
    user?.customAvatar ||
    DEFAULT_AVATARS[user?.gender?.toLowerCase()] ||
    DEFAULT_AVATARS.other;

  return (
    <AuthContext.Provider
      value={{
        user,
        avatarUrl,
        newAvatarUrl,
        signin,
        signout,
        setAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};