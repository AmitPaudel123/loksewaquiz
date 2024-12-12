import React from "react";
import { Link } from "react-router-dom";
import bgsmall from "../Assets/bgsmall.jpg";
import bglarge from "../Assets/bglarge.jpg";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-[93vh] md:h-[95vh] lg:h-[92vh] bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: `url(${window.innerWidth < 768 ? bgsmall : bglarge})`,
      }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Welcome to Loksewa Quiz App!
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
        <Link
          to="/play-quiz"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Play Quiz
        </Link>

        {/* Learn Materials Button */}
        <Link
          to="/learn-materials"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Learn Materials
        </Link>
      </div>
    </div>
  );
};

export default Home;
