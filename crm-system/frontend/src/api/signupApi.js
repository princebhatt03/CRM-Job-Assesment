// src/api/signupApi.js
import axios from "axios";

const SIGNUP_URL = "http://localhost:5000/v1/user";

export const signupApi = async (formData) => {
  try {
    const response = await axios.post(SIGNUP_URL, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};
