import React, { useState } from "react";
import { login } from "../services/auth"; // Import the login service
import bgsmall from "../Assets/bgsmall.jpg";
import bglarge from "../Assets/bglarge.jpg";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons for visibility toggle

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility
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
        const result = await login(userData);
        alert(result.message || "Login Successful!"); // Handle success
        // Redirect to home page with user name
        navigate(`/home?name=${encodeURIComponent(result.name)}`);
      } catch (error) {
        alert(error.message || "Login failed!"); // Handle error
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
      <div className="w-11/12 md:w-1/3 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
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
              type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
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
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-3">
            Don't have an account?
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
