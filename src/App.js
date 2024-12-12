import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PlayQuiz from "./components/PlayQuiz";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
