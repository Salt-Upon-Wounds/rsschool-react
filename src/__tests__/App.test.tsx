import { screen, render } from "@testing-library/react";
import App from "../components/app/App";

describe("App tests", () => {
  it("should render the title", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Hello Stranger!");
  });
});
