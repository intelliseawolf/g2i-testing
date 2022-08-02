import { Link } from "react-router-dom";

import * as styles from "../styles";

const Home = () => {
  return (
    <main>
      <div className="md:w-96 sm:w-full mx-auto bg-slate-200 text-center px-12">
        <h1 className="font-bold">Welcome to the Trivia Challenge!</h1>
        <p className="mt-36">
          You will be presented with 10 True or False questions.
        </p>
        <p className="mt-36">Can you score 100%?</p>
        <Link to="quiz">
          <button className={"mt-28 mb-4 " + styles.primaryButtonStyle}>
            BEGIN
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
