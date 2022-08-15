import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Result from "../Result";
import { setupStore } from "../../app/store";

test("renders the result page", () => {
  const store = setupStore({
    quiz: {
      result: [
        { id: 0, answer: "False" },
        { id: 1, answer: "False" },
        { id: 2, answer: "True" },
        { id: 3, answer: "True" },
        { id: 4, answer: "True" },
        { id: 5, answer: "True" },
        { id: 6, answer: "True" },
        { id: 7, answer: "True" },
        { id: 8, answer: "True" },
        { id: 9, answer: "True" },
      ],
      status: "idle",
      quizList: [
        { correct_answer: "True", category: "", question: "false question" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
        { correct_answer: "True", category: "", question: "" },
      ],
    },
  });
  render(
    <Provider store={store}>
      <Result />
    </Provider>,
    { wrapper: BrowserRouter }
  );

  const correctAnswerCount = screen.getByText(/8/i);
  const incorrectQuiz = screen.getByText(/-false question/i);
  expect(correctAnswerCount).toBeInTheDocument();
  expect(incorrectQuiz).toBeInTheDocument();
});
