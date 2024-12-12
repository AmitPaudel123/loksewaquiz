import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgsmall from "../Assets/bgsmall.jpg";
import bglarge from "../Assets/bglarge.jpg";
// Dummy questions for now
const allQuestions = [
  {
    question: "What is the capital of Nepal?",
    options: ["Pokhara", "Kathmandu", "Lalitpur", "Biratnagar"],
    correct: 1, // Index of the correct answer
  },
  {
    question: "Who wrote 'Muna Madan'?",
    options: [
      "Laxmi Prasad Devkota",
      "Bhanubhakta Acharya",
      "BP Koirala",
      "Madan Bhandari",
    ],
    correct: 0,
  },
  {
    question: "What is the national flower of Nepal?",
    options: ["Sunflower", "Lotus", "Rhododendron", "Rose"],
    correct: 2,
  },
  {
    question: "Which is the tallest mountain in the world?",
    options: ["K2", "Everest", "Makalu", "Kanchenjunga"],
    correct: 1,
  },
  {
    question: "What is the currency of Nepal?",
    options: ["Rupee", "Dollar", "Euro", "Yen"],
    correct: 0,
  },
  {
    question: "Which is the longest river in Nepal?",
    options: ["Koshi", "Ganga", "Karnali", "Madhumati"],
    correct: 2,
  },
  {
    question: "Who is the first President of Nepal?",
    options: [
      "Bidhya Devi Bhandari",
      "Ram Baran Yadav",
      "KP Sharma Oli",
      "Madhav Kumar Nepal",
    ],
    correct: 1,
  },
  {
    question: "What is the national animal of Nepal?",
    options: ["Tiger", "Cow", "Elephant", "Rhino"],
    correct: 1,
  },
  {
    question: "When was the first republic declared in Nepal?",
    options: ["2008", "1990", "1951", "1985"],
    correct: 0,
  },
  {
    question: "Which is the largest lake in Nepal?",
    options: ["Rara Lake", "Phewa Lake", "Begnas Lake", "Rupse Lake"],
    correct: 0,
  },
];

const PlayQuiz = () => {
  // Randomize questions for each quiz
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Get 10 random questions
    const randomQuestions = [];
    while (randomQuestions.length < 10) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      if (!randomQuestions.includes(allQuestions[randomIndex])) {
        randomQuestions.push(allQuestions[randomIndex]);
      }
    }
    setQuestions(randomQuestions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return; // Prevent selecting more than one answer per question

    setSelectedOption(index);

    // Check if the selected answer is correct or incorrect
    if (index === currentQuestion.correct) {
      setAnswerStatus("correct");
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1); // Increment correct answers
    } else {
      setAnswerStatus("incorrect");
    }

    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    setAnswerStatus("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true); // Mark quiz as finished when all questions are answered
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="h-[93vh] md:h-[95vh] lg:h-[92vh] flex flex-col items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${window.innerWidth < 768 ? bgsmall : bglarge})`,
      }}
    >
      <div
        className=" w-[85%] md:w-[60%] p-6 bg-white rounded "
        style={{
          backgroundImage: `url(${
            window.innerWidth < 768 ? bgsmall : bglarge
          })`,
        }}
      >
        {!quizFinished ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="mb-6 text-lg">{currentQuestion.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentQuestion.options.map((option, index) => {
                let optionClass = " p-3 rounded cursor-pointer shadow-lg";
                if (showResult) {
                  if (
                    index === currentQuestion.correct &&
                    answerStatus === "correct"
                  ) {
                    optionClass += " bg-green-600 border-green-600 text-white"; // Correct answer
                  } else if (
                    index !== currentQuestion.correct &&
                    index === selectedOption &&
                    answerStatus === "incorrect"
                  ) {
                    optionClass += " bg-red-600 border-red-600 text-white"; // Incorrect answer
                  }
                }

                return (
                  <div
                    key={index}
                    className={`${optionClass} ${
                      !showResult && "hover:bg-gray-100"
                    }`}
                    onClick={() => !showResult && handleOptionClick(index)}
                  >
                    {option}
                  </div>
                );
              })}
            </div>

            {showResult && (
              <div className="mb-6 text-lg">
                {answerStatus === "correct" ? (
                  <span className="text-green-500">Correct Answer!</span>
                ) : (
                  <span className="text-red-500">
                    Incorrect! Correct answer:{" "}
                    {currentQuestion.options[currentQuestion.correct]}
                  </span>
                )}
              </div>
            )}

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleNext}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next"}
            </button>
          </>
        ) : (
          // Show final results after quiz finishes
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
            <p className="mb-4 text-lg">
              You answered {correctAnswers} out of {questions.length} questions
              correctly!
            </p>
            <p className="text-lg">
              Your progress:{" "}
              {Math.round((correctAnswers / questions.length) * 100)}%
            </p>

            <div className=" flex gap-10 items-center justify-center mt-7">
              <Link to="/" className=" text-white bg-blue-600 p-2 rounded-md">
                Back to Home
              </Link>
              <Link
                to="/play-quiz"
                className=" text-white bg-blue-600 p-2 rounded-md"
              >
                Play Quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayQuiz;
