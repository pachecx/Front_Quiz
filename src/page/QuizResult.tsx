import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import quizData from "../mock/Quiz";

interface ResultState {
  quizId?: string;
  quizTitle?: string;
  answers?: Record<string, string>;
}

const QuizResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const resultState = (state || {}) as ResultState;

  const selectedQuiz = useMemo(
    () => quizData.find((quiz) => quiz.id === resultState.quizId),
    [resultState.quizId],
  );

  if (!selectedQuiz || !resultState.answers) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 text-slate-100">
        <div className="w-full max-w-md rounded-xl bg-slate-800 p-6 text-center">
          <h1 className="text-2xl font-bold">Resultado indisponivel</h1>
          <p className="mt-2 text-slate-300">Responda um quiz para visualizar seu desempenho.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 cursor-pointer rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900"
          >
            Escolher tema
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = selectedQuiz.questions.length;
  const score = selectedQuiz.questions.reduce((acc, question) => {
    return resultState.answers?.[question.id] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-slate-800/80 p-5 shadow-xl sm:p-8">
        <h1 className="text-3xl font-bold">Resultado do quiz</h1>
        <p className="mt-2 text-slate-300">Tema: {resultState.quizTitle || selectedQuiz.title}</p>

        <div className="mt-6 grid gap-4 rounded-xl bg-slate-700/40 p-5 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-300">Pontuacao</p>
            <p className="text-3xl font-bold text-cyan-400">{score}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">Total</p>
            <p className="text-3xl font-bold">{totalQuestions}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">Aproveitamento</p>
            <p className="text-3xl font-bold">{percentage}%</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Gabarito</h2>
          <div className="mt-4 space-y-4">
            {selectedQuiz.questions.map((question, index) => {
              const answer = resultState.answers?.[question.id] || "Nao respondida";
              const isCorrect = answer === question.correctAnswer;

              return (
                <article
                  key={question.id}
                  className="rounded-xl border border-slate-700 bg-slate-900/40 p-4"
                >
                  <p className="text-sm text-slate-400">Pergunta {index + 1}</p>
                  <h3 className="mt-1 font-semibold">{question.question}</h3>
                  <p className={`mt-3 text-sm ${isCorrect ? "text-emerald-400" : "text-amber-400"}`}>
                    Sua resposta: {answer}
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 text-sm text-cyan-300">Resposta correta: {question.correctAnswer}</p>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate(`/quiz/${selectedQuiz.id}`)}
            className="cursor-pointer rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            Tentar novamente
          </button>
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer rounded-lg border border-slate-600 px-5 py-3 font-semibold transition hover:bg-slate-700"
          >
            Escolher outro tema
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
