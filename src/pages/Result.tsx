import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { clearAnswer } from "../app/modules/quizSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as styles from "../styles";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { result, quizList } = useAppSelector((state) => state.quiz);
  const numberOfCorrectAnswers = useMemo(
    () =>
      quizList.filter(
        (quiz, index) => quiz.correct_answer === result[index]?.answer
      ).length,
    [quizList, result]
  );

  function isCorrect(index: number) {
    return quizList[index].correct_answer === result[index]?.answer;
  }

  function handlePlayAgain() {
    dispatch(clearAnswer());
    navigate("/quiz");
  }

  return (
    <main>
      <div className="md:w-96 sm:w-full mx-auto bg-slate-200 px-8">
        <h1 className="font-bold text-center">
          You scored
          <br />
          {numberOfCorrectAnswers} / 10
        </h1>
        <div className="mt-8 flex flex-col">
          {quizList.map((item, index) => {
            return (
              <p
                className="text-sm mb-2"
                dangerouslySetInnerHTML={{
                  __html: (isCorrect(index) ? "+" : "-") + item.question,
                }}
                key={index}
              ></p>
            );
          })}
        </div>
        <div className="text-center">
          <button
            className={"mt-4 mb-4 " + styles.primaryButtonStyle}
            onClick={handlePlayAgain}
          >
            PLAY AGAIN?
          </button>
        </div>
      </div>
    </main>
  );
};

export default Result;
