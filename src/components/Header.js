import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between md:px-[4rem] lg:px-[5rem] items-center p-4 bg-blue-600 text-white">
      <Link to="/" className="text-xl font-bold">
        Loksewa Quiz
      </Link>
      <div>
        <Link
          to="/login"
          className="mr-4 px-4 py-2 bg-white text-blue-600 text-lg rounded"
        >
          Login
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-white text-blue-600 rounded">
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Header;
