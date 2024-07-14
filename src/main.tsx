import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ErrorMessage } from "./components/error/error";
import { Sideinfo } from "./components/sideinfo/sideinfo";

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
