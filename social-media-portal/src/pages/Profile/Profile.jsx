import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileView from "../../Profile/ProfileView";
import profileService from "../../services/ProfileService";
import { useParams } from "react-router-dom";
const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();
const isOwnProfile = Number(userId) === user?.userId;
  const fields = [
    // { name: "id", label: "ID" },
    // { name: "userId", label: "User ID" },
    { name: "fName", label: "First Name" },
    { name: "lName", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile" },
    { name: "city", label: "City" },
    { name: "country", label: "Country" },
    //{ name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "gender", label: "Gender" },
    // { name: "profilePublic", label: "Profile Public", type: "checkbox" },
    { name: "dob", label: "DOB", type: "date" }
  ];

  useEffect(() => {
    console.log("ProfilePage mounted with user:", user);
     console.log("Getting profile for userId:", userId);
    const fetchProfile = async () => {
      try {
         

        const response = await profileService.getProfileByUserId(userId);
        console.log("Fetched profile:", response);
        response.avatarUrl  == null ? response.avatarUrl = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png" : response.avatarUrl = response.avatarUrl;
        setProfile(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (user?.userId) {
       

      fetchProfile();
    }
  }, [user]);

  const handleSave = async (data,id) => {
    try {
      const response = await profileService.updateProfile(data, id);
      //setProfile(response);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <ProfileView
      fields={fields}
      initialData={profile}
      onSave={handleSave}
       isOwnProfile={isOwnProfile}
    />
  );
};

export default ProfilePage;