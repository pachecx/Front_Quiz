import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizData, { type QuizQuestionItem } from "../mock/Quiz";

const QUIZ_QUESTION_LIMIT = 10;

const shuffleQuestions = (questions: QuizQuestionItem[]) => {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

const QuizQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const selectedQuiz = useMemo(() => quizData.find((item) => item.id === id), [id]);

  const quizQuestions = useMemo(() => {
    if (!selectedQuiz) {
      return [];
    }

    return shuffleQuestions(selectedQuiz.questions).slice(
      0,
      Math.min(QUIZ_QUESTION_LIMIT, selectedQuiz.questions.length),
    );
  }, [selectedQuiz]);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
  }, [id]);

  if (!selectedQuiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 text-slate-100">
        <div className="w-full max-w-md rounded-xl bg-slate-800 p-6 text-center">
          <h1 className="text-2xl font-bold">Tema nao encontrado</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 cursor-pointer rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900"
          >
            Voltar para inicio
          </button>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 text-slate-100">
        <div className="w-full max-w-md rounded-xl bg-slate-800 p-6 text-center">
          <h1 className="text-2xl font-bold">Este tema nao possui perguntas</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 cursor-pointer rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900"
          >
            Voltar para inicio
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const selectedAnswer = answers[currentQuestion.id];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const selectOption = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const goNext = () => {
    if (!selectedAnswer) {
      return;
    }

    if (isLastQuestion) {
      navigate("/result", {
        state: {
          quizId: selectedQuiz.id,
          quizTitle: selectedQuiz.title,
          answers,
          questionIds: quizQuestions.map((question) => question.id),
        },
      });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const goPrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-slate-800/80 p-5 shadow-xl sm:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-300">Tema selecionado</p>
            <h1 className="text-2xl font-bold sm:text-3xl">{selectedQuiz.title}</h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            Trocar tema
          </button>
        </div>

        <p className="text-sm font-medium text-cyan-400">
          Pergunta {currentIndex + 1} de {totalQuestions}
        </p>
        <h2 className="mt-2 text-lg font-semibold leading-relaxed sm:text-2xl">
          {currentQuestion.question}
        </h2>

        <div className="mt-5 h-2 w-full rounded-full bg-slate-700">
          <div
            className="h-2 rounded-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const active = selectedAnswer === option;

            return (
              <button
                key={option}
                onClick={() => selectOption(option)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition sm:px-5 ${
                  active
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-slate-600 bg-slate-700/40 hover:bg-slate-700"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${
                    active ? "bg-cyan-500 text-slate-900" : "bg-slate-600 text-slate-100"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm sm:text-base">{option}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={goPrevious}
            disabled={currentIndex === 0}
            className="cursor-pointer rounded-lg border border-slate-600 px-4 py-3 font-semibold transition enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          <button
            onClick={goNext}
            disabled={!selectedAnswer}
            className="cursor-pointer rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-900 transition enabled:hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastQuestion ? "Finalizar quiz" : "Proxima pergunta"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
