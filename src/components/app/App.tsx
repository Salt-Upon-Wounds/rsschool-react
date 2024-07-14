import { useEffect, useState } from "react";
import style from "./App.module.css";
import { ErrorBoundary } from "../error-boundary/ErrorBoundary";
import { SearchPanel } from "../top/SearchPanel";
import { ResultList } from "../bottom/ResultList";
import { useLS } from "../../hooks/useLS";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search");
  const pageParam = parseInt(searchParams.get("page") ?? "1");
  const [page, setPage] = useState(pageParam);

  const [initvalue, setInitValue] = useLS(searchParam);
  const [value, setValue] = useState(initvalue);

  const location = useLocation();
  console.log(location.pathname);

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

  return (
    <ErrorBoundary>
      <div className="main">
        <h1 className={style.header}>Hello Stranger!</h1>
        <SearchPanel
          initvalue={initvalue}
          rerender={setValue}
          save={setInitValue}
        ></SearchPanel>
        <ResultList value={value} page={page} rerender={setPage}></ResultList>
      </div>
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
