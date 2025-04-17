import { FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { Switch } from "@headlessui/react";
import { useState, useEffect, useCallback } from "react";
import service from "./service/service";
import Icon from "./assets/icon.svg";
import { useNavigate } from "react-router-dom";

interface Quiz{
  id: string;
  titulo: string;
}

const App = () => {
  const navigate = useNavigate()
  // Verifica o tema salvo no localStorage
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  const [quiz, setQuiz] = useState<Quiz[]>([{
    id: "",
    titulo: ""
  }]);

  const pegarQuiz = useCallback(async () => {
    try {
      const response = await service.get(`/quizzes`);
      setQuiz(response.data)

      console.log(quiz);

    } catch (error) {
      console.log(error);
    }
  }, []);
  

  // Atualiza o tema ao mudar o switch
  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }

    pegarQuiz()

  }, [enabled, pegarQuiz]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 
      ${enabled ? "bg-white text-black" : "bg-gray-900 text-white"} px-6`}
    >
      {/* Toggle Theme Switch */}
      <div className="absolute top-4 right-4 flex items-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            enabled ? "bg-gray-300" : "bg-purple-700"
          }`}
        >
          <span className="sr-only">Toggle Theme</span>
          <span
            className={`size-4 transform rounded-full bg-white transition ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </Switch>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center">
        Welcome to the <br />
        <span className="text-blue-400">Frontend Quiz!</span>
      </h1>
      <p className="mt-2 text-gray-500">Pick a subject to get started.</p>

      {/* Quiz Options */}
      <div className="mt-6 w-full max-w-xs space-y-4">
        {/* {[
          { label: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
          { label: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
          { label: "Javascript", icon: <FaJs className="text-yellow-500" /> },
          {
            label: "Accessibility",
            icon: <BiLogoTypescript className="text-blue-500" />,
          },
        ].map((item, index) => (
          <button
            key={index}
            className={`flex cursor-pointer items-center w-full p-4 rounded-lg shadow-md transition ${
              enabled ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <span className="mr-3 text-2xl">{item.icon}</span>
            <span className="text-lg font-medium">{item.label}</span>
          </button>
        ))} */}
          {quiz.map((qui) => (
            <button
              key={qui.id}
              onClick={() => navigate(`/quiz/${qui.id}`)}
              className={`flex cursor-pointer items-center w-full p-4 rounded-lg shadow-md transition ${
              enabled ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <img src={Icon} className="mr-3 h-8 w-8"></img>
            <span className="text-lg font-medium">{qui.titulo}</span>
          </button>
          ))}
      </div>
    </div>
  );
};

export default App;
