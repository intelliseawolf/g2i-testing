import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "../Home";

test("renders welcome text", () => {
  render(<Home />, { wrapper: BrowserRouter });
  const welcomeElement = screen.getByText(/Welcome to the Trivia Challenge!/i);
  expect(welcomeElement).toBeInTheDocument();
});
