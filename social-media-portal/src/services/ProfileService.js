import axiosClient from "../api/axiosClient";

const getProfileByUserId = async (userId) => {
  const response = await axiosClient.get(`/profiles/${userId}`);
  return response.data;
};

const updateProfile = async (profileData, id) => {
  try {
    const response = await axiosClient.put(
      `/profiles/${id}`,
      profileData
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Profile update failed";
  }
};
const uploadAvatar = async (formData) => {
  const response = await fetch("/api/upload-avatar", {
    method: "POST",
    body: formData,
  });

  return response.json();
};
export default {
  getProfileByUserId,
  updateProfile,
};