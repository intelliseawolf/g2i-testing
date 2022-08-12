import axios from "axios";

const fetchQuizList = () => {
  return axios.get(
    "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
  );
};

export { fetchQuizList };
