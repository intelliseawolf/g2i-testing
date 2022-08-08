import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import { getQuizList, addAnswer } from "../app/modules/quizSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as styles from "../styles";

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { quizList, result } = useAppSelector((state) => state.quiz);
  const [index, setIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    dispatch(getQuizList());
  }, [dispatch]);

  useEffect(() => {
    const itemIndex = result.findIndex((item) => item.id === index);

    if (itemIndex !== -1) setAnswer(result[itemIndex].answer.toString());
  }, [index, result]);

  function getQuestionMarkup() {
    return {
      __html: quizList[index].question,
    };
  }

  function handleNext() {
    if (answer === "") return toast.error("Please choose the answer!");
    if (index === quizList.length - 1) navigate("/result", { replace: true });

    dispatch(
      addAnswer({
        id: index,
        answer: answer,
      })
    );
    setIndex(index + 1);
    setAnswer("");
  }

  function handlePrev() {
    setIndex(index - 1);
  }

  return (
    <main>
      {quizList.length ? (
        <div className="md:w-96 sm:w-full mx-auto bg-slate-200 text-center p-4">
          <h1 className="font-bold">{quizList[index].category}</h1>
          <p
            className="flex items-center h-64 mt-20 border border-black px-4"
            dangerouslySetInnerHTML={getQuestionMarkup()}
          ></p>
          <div className="text-lg mt-3">{index + 1} of 10</div>
          <div className="mt-10 flex justify-around">
            <label htmlFor="true answer">
              True
              <input
                type="radio"
                className="checked:bg-blue-500 ml-4"
                name="answer"
                value="True"
                checked={answer === "True"}
                onChange={() => setAnswer("True")}
              />
            </label>
            <label htmlFor="false answer">
              False
              <input
                type="radio"
                className="checked:bg-blue-500 ml-4"
                name="answer"
                value="False"
                checked={answer === "False"}
                onChange={() => setAnswer("False")}
              />
            </label>
          </div>
          <div className="mt-10 flex justify-around">
            {index !== 0 && (
              <button
                onClick={() => handlePrev()}
                className={styles.primaryButtonStyle}
              >
                Prev
              </button>
            )}
            <button
              className={styles.primaryButtonStyle}
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Quiz;
