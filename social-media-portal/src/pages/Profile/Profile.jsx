import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileView from "../../Profile/ProfileView";
import profileService from "../../services/ProfileService";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  const fields = [
    // { name: "id", label: "ID" },
    // { name: "userId", label: "User ID" },
    { name: "fName", label: "First Name" },
    { name: "lName", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile" },
    { name: "avatarUrl", label: "Avatar URL" },
    { name: "city", label: "City" },
    { name: "country", label: "Country" },
    //{ name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "gender", label: "Gender" },
    // { name: "profilePublic", label: "Profile Public", type: "checkbox" },
    { name: "dob", label: "DOB", type: "date" }
  ];

  useEffect(() => {
    console.log("ProfilePage mounted with user:", user);
     console.log("Getting profile for userId:", user?.userId);
    const fetchProfile = async () => {
      try {
         

        const response = await profileService.getProfileByUserId(user?.userId);
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
    />
  );
};

export default ProfilePage;