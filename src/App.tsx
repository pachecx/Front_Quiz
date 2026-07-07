import { FaCss3Alt, FaHtml5, FaJs, FaReact, FaUserTie } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { Switch } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "./mock/Quiz";

const iconByTheme = {
  html: <FaHtml5 className="text-2xl text-orange-500" />,
  css: <FaCss3Alt className="text-2xl text-blue-500" />,
  javascript: <FaJs className="text-2xl text-yellow-400" />,
  typescript: <BiLogoTypescript className="text-2xl text-sky-500" />,
  react: <FaReact className="text-2xl text-cyan-400" />,
  interview: <FaUserTie className="text-2xl text-emerald-400" />,
};

const App = () => {
  const navigate = useNavigate();

  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

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

  }, [enabled]);

  const containerTheme = useMemo(
    () =>
      enabled
        ? "bg-slate-50 text-slate-900"
        : "bg-slate-900 text-slate-100",
    [enabled],
  );

  const cardTheme = enabled
    ? "bg-white hover:bg-slate-100 border-slate-200"
    : "bg-slate-800 hover:bg-slate-700 border-slate-700";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${containerTheme} px-4 py-8 sm:px-6 lg:px-10`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-end">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            enabled ? "bg-gray-300" : "bg-purple-700"
          }`}
        >
          <span className="sr-only">Alternar tema</span>
          <span
            className={`size-4 transform rounded-full bg-white transition ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </Switch>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(260px,420px)_1fr] lg:items-start">
          <header>
            <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              Frontend Quiz
            </h1>
            <p className={`mt-3 text-sm sm:text-base ${enabled ? "text-slate-600" : "text-slate-300"}`}>
              Escolha um tema e teste seu conhecimento em desenvolvimento frontend.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quizData.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className={`flex cursor-pointer flex-col items-start rounded-xl border p-4 text-left shadow-sm transition ${cardTheme}`}
          >
              <span className="mb-3 rounded-md bg-black/5 p-2 dark:bg-white/10">
                {iconByTheme[quiz.icon]}
              </span>
              <span className="text-lg font-semibold">{quiz.title}</span>
              <span className={`mt-1 text-sm ${enabled ? "text-slate-600" : "text-slate-300"}`}>
                {quiz.description}
              </span>
          </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
