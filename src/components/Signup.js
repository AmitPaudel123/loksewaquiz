import React, { useState } from "react";
import { signup } from "../services/auth"; // Import the signup service
import bgsmall from "../Assets/bgsmall.jpg";
import bglarge from "../Assets/bglarge.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons
import { IoClose } from "react-icons/io5"; // Close icon for notification
import { Link } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null); // Notification state

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required.";
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
      setIsLoading(true);
      try {
        const userData = { username, email, password };
        const result = await signup(userData);
        setNotification({
          message: result.message || "Signup Successful!",
          type: "success",
        });
        setUsername("");
        setEmail("");
        setPassword("");
      } catch (error) {
        setNotification({
          message: error.message || "Signup failed!",
          type: "error",
        });
      } finally {
        setIsLoading(false);
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
          className={` top-4 right-4 w-80 md:w-[25rem] p-4 mb-2 rounded shadow-lg text-white ${
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
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
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
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            />
            <span
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
              className="absolute right-4 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>

          <div className="mt-3">
            Already have an account?
            <Link
              to="/login"
              className="hover:underline hover:text-blue-500 ml-1"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
