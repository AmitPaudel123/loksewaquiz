import React, { useState } from "react";
import { login } from "../services/auth"; // Import the login service
import bgsmall from "../Assets/bgsmall.jpg";
import bglarge from "../Assets/bglarge.jpg";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons for visibility toggle
import { IoClose } from "react-icons/io5"; // Close icon for notification

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility
  const [notification, setNotification] = useState(null); // Notification state
  const navigate = useNavigate(); // Initialize useNavigate

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsLoading(true); // Set loading state
      try {
        const userData = { email, password };
        const result = await login(userData); // Call the login service
        setNotification({
          message: result.message || "Login Successful!",
          type: "success",
        });
        navigate(`/?name=${encodeURIComponent(result.name)}`); // Navigate to home page
      } catch (error) {
        setNotification({
          message:
            error.response?.data?.message || "Login failed! Please try again.",
          type: "error",
        });
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${window.innerWidth < 768 ? bgsmall : bglarge})`,
      }}
    >
      {/* Notification Popup */}
      {notification && (
        <div
          className={`top-4 right-4 w-80 md:w-[25rem] p-4 mb-2 rounded shadow-lg text-white ${
            notification.type === "success" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          <div className="flex justify-between items-center">
            <p>{notification.message}</p>
            <IoClose
              className="cursor-pointer text-xl"
              onClick={() => setNotification(null)}
            />
          </div>
        </div>
      )}

      <div className="w-11/12 md:w-1/3 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            />
            {/* Eye icon to toggle password visibility */}
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <FiEyeOff className="text-gray-500" />
              ) : (
                <FiEye className="text-gray-500" />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Sign Up Link */}
          <div className="mt-3 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="hover:underline hover:text-blue-500 ml-1"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
