import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Quiz from "./page/QuizQuestion.tsx";
import QuizResult from "./page/QuizResult.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/quiz/:id",
    element: <Quiz />
  },
  {
    path: "/result",
    element: <QuizResult />
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
