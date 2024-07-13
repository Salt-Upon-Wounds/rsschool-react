import { useState } from "react";
import style from "./App.module.css";
import { ErrorBoundary } from "../error-boundary/ErrorBoundary";
import { SearchPanel } from "../top/SearchPanel";
import { ResultList } from "../bottom/ResultList";
import { useLS } from "../../hooks/useLS";

function App() {
  const [initvalue, setInitValue] = useLS();
  const [value, setValue] = useState(initvalue);

  return (
    <ErrorBoundary>
      <h1 className={style.header}>Hello Stranger!</h1>
      <SearchPanel
        initvalue={initvalue}
        rerender={setValue}
        save={setInitValue}
      ></SearchPanel>
      <ResultList value={value}></ResultList>
    </ErrorBoundary>
  );
}

export default App;
