import { Component } from "react";
import style from "./App.module.css";
import { ErrorBoundary } from "../error-boundary/ErrorBoundary";

class App extends Component<{}, { value: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <ErrorBoundary>
        <div className={style.root}>
          <h1 className={style.header}>Hello Stranger!</h1>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
