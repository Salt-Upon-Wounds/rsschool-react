import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from "../redux/store";
import App from "../components/app/App";
import { ErrorMessage } from "../components/error/error";
import { act } from "react";
import { Sideinfo } from "../components/sideinfo/sideinfo";

describe("App tests", () => {
  it("should render the title", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/?search=&page=1"]}>
          <App></App>
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Hello Stranger!");
  });
  it("should render the error", () => {
    render(
      <Provider store={store}>
        <RouterProvider
          router={createMemoryRouter(
            [
              {
                path: "/",
                element: <App />,
                errorElement: <ErrorMessage />,
                children: [
                  {
                    path: "species/:id",
                    element: <Sideinfo></Sideinfo>,
                  },
                ],
              },
            ],
            { initialEntries: ["/asd"] },
          )}
        ></RouterProvider>
      </Provider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Oops!");
  });
  it("should render the boundery error", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/?search=&page=1"]}>
          <App></App>
        </MemoryRouter>
      </Provider>,
    );
    act(() => {
      screen.getByText("Error").click();
    });

    expect(
      screen.getByRole("heading", {
        level: 2,
        hidden: true,
      }),
    ).toHaveTextContent("Something went wrong.");
  });
  it("should render sideinfo", async () => {
    render(
      <Provider store={store}>
        <RouterProvider
          router={createMemoryRouter(
            [
              {
                path: "/",
                element: <App />,
                errorElement: <ErrorMessage />,
                children: [
                  {
                    path: "species/:id",
                    element: <Sideinfo></Sideinfo>,
                  },
                ],
              },
            ],
            { initialEntries: ["/"] },
          )}
        ></RouterProvider>
      </Provider>,
    );
    await waitForElementToBeRemoved(screen.queryByAltText("loading..."));
    act(() => screen.getByText("Name", { exact: false }).click());
    await waitForElementToBeRemoved(screen.queryByAltText("loading..."));
    expect(
      screen.getByText("This creature is from:", { exact: false }),
    ).toHaveTextContent("TESTPLANET");
  });
});
