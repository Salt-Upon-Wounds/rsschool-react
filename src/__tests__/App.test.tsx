import { screen, render } from "@testing-library/react";
import App from "../components/app/App";
import { BrowserRouter } from "react-router-dom";

describe("App tests", () => {
  it("should render the title", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Hello Stranger!");
  });
});
