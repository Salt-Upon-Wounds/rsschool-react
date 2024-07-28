import { createContext, useEffect, useReducer, useState } from "react";
import style from "./App.module.css";
import { ErrorBoundary } from "../error-boundary/ErrorBoundary";
import { SearchPanel } from "../top/SearchPanel";
import { ResultList } from "../bottom/ResultList";
import { useLS } from "../../hooks/useLS";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Flyout } from "../flyout/flyout";

export const ThemeContext = createContext("light");

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search");
  const pageParam = parseInt(searchParams.get("page") ?? "1");
  const [page, setPage] = useState(pageParam);
  const [theme, setTheme] = useState("light");

  const [initvalue, setInitValue] = useLS(searchParam);
  const [value, setValue] = useState(initvalue);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      searchParams.set("search", value);
      if (searchParam !== value) setPage(1);
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    }
  }, [
    value,
    page,
    searchParams,
    setSearchParams,
    location.pathname,
    searchParam,
  ]);

  function nonSideClickHandler() {
    if (location.pathname !== "/") navigate("/");
  }

  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  function switchTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={theme}>
        <div
          className={`${style.main} ${theme === "light" ? "" : style.dark}`}
          onClick={nonSideClickHandler}
        >
          <button className={style.switcher} onClick={switchTheme}>
            Switch
          </button>
          <h1 className={style.header}>Hello Stranger!</h1>
          <SearchPanel
            initvalue={initvalue}
            rerender={setValue}
            save={setInitValue}
          ></SearchPanel>
          <ResultList value={value} page={page} rerender={setPage}></ResultList>
          <Flyout rerender={forceUpdate}></Flyout>
        </div>
        <Outlet />
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}
