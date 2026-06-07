import axios from "axios";
const BASE_URL = import.meta.env.VITE_USER_MANAGEMENT;


const signup = async (userData) => {
  console.debug(BASE_URL);
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Signup failed";
  }
};

const signin = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, userData, {
        withCredentials: true
      });
    return response.data;
  } catch (error) {
    throw error.response?.data || "SignIn failed";
  }
};
const signout = async () => {
  console.debug(BASE_URL);
  try {
    const response = await axios.post(`${BASE_URL}/users/signout`,null, {
        withCredentials: true
      });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Sign out failed";
  }
};
export default {
  signup,signin,signout
  
};