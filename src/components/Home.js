import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgsmall from "../Assets/bgsmall.jpg";
import bglarge from "../Assets/bglarge.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State for user's username

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user"); // Get user details from localStorage
    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Parse user data if available
        setUserName(parsedUser.username); // Set user's username if user is logged in
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handlePlayQuizClick = () => {
    if (!userName) {
      setIsLoginPopupOpen(true); // Open login popup if user is not logged in
    } else {
      navigate("/play-quiz"); // Navigate to quiz page if user is logged in
    }
  };

  const handleLearnMaterialClick = () => {
    if (!userName) {
      setIsLoginPopupOpen(true); // Open login popup if user is not logged in
    } else {
      navigate("/learn-materials"); // Navigate to learning materials page if user is logged in
    }
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false); // Close the popup
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-[93vh] md:h-[95vh] lg:h-[92vh] bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: `url(${window.innerWidth < 768 ? bgsmall : bglarge})`,
      }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {userName ? `Welcome, ${userName}!` : "Welcome to Loksewa Quiz App!"}
      </h1>
      <h2 className="md:text-lg md:text-center text-gray-700 md:w-[85%] mb-8 px-4">
        Loksewa Quiz App is designed to help you prepare for the Loksewa exams
        in a fun and interactive way. Whether you're a first-time taker or
        someone looking to improve your scores, our platform provides the
        perfect environment to test your knowledge, track your progress, and
        learn key concepts.
      </h2>
      <div className="md:text-lg md:text-center text-gray-600 mb-6 px-6">
        <strong>Features:</strong>
        <ul className="list-disc pl-6">
          <li>
            Play quizzes with randomized questions to simulate the real exam
            experience.
          </li>
          <li>
            Access learning materials to brush up on key topics and study at
            your own pace.
          </li>
          <li>
            Track your quiz performance and see how you improve over time.
          </li>
        </ul>
      </div>
      <p className="md:text-lg md:text-center text-gray-600 mb-6 px-6">
        Start your journey towards success today by practicing with our quizzes
        and expanding your knowledge with our learning resources.
      </p>

      <div className="flex space-x-4">
        {/* Play Quiz Button */}
        <button
          onClick={handlePlayQuizClick}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Play Quiz
        </button>

        {/* Learn Materials Button */}
        <button
          onClick={handleLearnMaterialClick}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Learn Materials
        </button>
      </div>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50"
          onClick={handleLoginPopupClose} // Close the popup when clicking outside
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-80 md:w-[25rem]"
            onClick={(e) => e.stopPropagation()} // Prevent closing the popup when clicking inside
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              You need to log in to continue
            </h2>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Login
              </Link>
              <button
                onClick={handleLoginPopupClose}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
