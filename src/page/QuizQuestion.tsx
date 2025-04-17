import React, { useCallback, useEffect, useState } from "react";
import { FaUniversalAccess } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import api from "../service/service"
import { useParams } from "react-router-dom";

const QuizQuestion = () => {
  const {id} = useParams()
  const [dados, setdados] = useState([])

  const pegarQuestoes = useCallback( async () => {
    try {
      const response = await api.get(`/perguntas/quiz/${id}`)
      setdados(response.data[0])
    } catch (error) {
      console.log(error)
    }
  }, [id])

  useEffect(()=>{
    pegarQuestoes()
  }, [pegarQuestoes])

  console.log(id)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FaUniversalAccess className="text-purple-500 text-2xl" />
            <span className="text-lg font-medium">Accessibility</span>
          </div>
          {/* <Switch className="relative inline-flex h-5 w-10 items-center rounded-full bg-gray-700">
            <span className="sr-only">Toggle Theme</span>
            <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition" />
          </Switch> */}
        </div>

        {/* Question */}
        <p className="text-gray-400 italic">Question 6 of 10</p>
        <h2 className="mt-2 text-lg font-semibold">
          Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?
        </h2>
        
        {/* Progress Bar */}
        <div className="mt-4 w-full h-1 bg-gray-700 rounded-full">
          <div className="h-1 bg-purple-500 w-3/5 rounded-full"></div>
        </div>

        {/* Answer Choices */}
        <div className="mt-4 space-y-2">
          {["4.5:1", "3:1", "2.5:1", "5:1"].map((option, index) => (
            <button
              key={index}
              className="w-full cursor-pointer flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-gray-600 text-white font-bold rounded mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button className="w-full mt-4 p-3 cursor-pointer bg-purple-600 rounded-lg font-semibold hover:bg-purple-500 transition">
          Submit answer
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
