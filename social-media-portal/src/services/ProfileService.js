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

const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post(
      "/profiles/upload-avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Avatar upload failed";
  }
};

export default {
  getProfileByUserId,
  updateProfile,
  uploadAvatar,
};