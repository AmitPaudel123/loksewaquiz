import axios from "axios";

// Base URL for the backend API (change it to match your backend server address)
const API_BASE_URL = "http://localhost:5000/api/auth"; // Ensure your backend is running on this URL

// Signup function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data; // You may want to store the token or user data here
  } catch (error) {
    handleAxiosError(error); // Handle the error
    throw (
      error.response?.data || { message: "An error occurred during signup" }
    );
  }
};

// Login function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data; // Handle the token or user data
  } catch (error) {
    handleAxiosError(error); // Handle the error
    throw error.response?.data || { message: "An error occurred during login" };
  }
};

// Helper function to handle and log Axios errors
const handleAxiosError = (error) => {
  if (error.response) {
    console.error(
      "Error Response:",
      error.response.status,
      error.response.data,
      error.response.headers
    );
  } else if (error.request) {
    console.error("Error Request: No response received", error.request);
  } else {
    console.error("Error Message:", error.message);
  }
};
