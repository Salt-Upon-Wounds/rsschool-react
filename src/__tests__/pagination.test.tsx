import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store";
import { Pagination } from "../components/pagination/pagination";

describe("pagination tests", () => {
  it("should render '2 / 4'", () => {
    let turned;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/?search=&page=1"]}>
          <Pagination
            page={2}
            length={4}
            rerender={(page) => {
              turned = page;
            }}
          ></Pagination>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole("paragraph")).toHaveTextContent("2 / 4");
    screen.getByText("<").click();
    expect(turned).toBe(1);
    screen.getByText(">").click();
    expect(turned).toBe(3);
  });
});
