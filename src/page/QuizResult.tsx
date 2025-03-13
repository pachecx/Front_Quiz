import React from "react";

interface typeResult{
    score: string,
    totalQuestions: string,
    onPlayAgain: string
}

const QuizResult = ({ score, totalQuestions, onPlayAgain }:typeResult) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-purple-500 p-2 rounded-full">🌟</span>
            <span className="text-lg font-semibold">Accessibility</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-400">☀️</span>
            <span className="w-10 h-5 bg-gray-700 rounded-full flex items-center p-1">
              <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
            </span>
          </div>
        </div>
        
        {/* Quiz Completion Message */}
        <h2 className="text-2xl font-bold">Quiz completed</h2>
        <p className="text-lg text-gray-400">You scored...</p>

        {/* Score Box */}
        <div className="bg-gray-700 p-6 rounded-lg mt-4">
          <span className="text-xl font-bold">Accessibility</span>
          <p className="text-5xl font-bold text-white mt-2">{score}</p>
          <p className="text-gray-400">out of {totalQuestions}</p>
        </div>

        {/* Play Again Button */}
        <button
          className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-purple-700"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
