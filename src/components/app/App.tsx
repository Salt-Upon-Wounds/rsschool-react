import { Component } from "react";
import style from "./App.module.css";
import { ErrorBoundary } from "../error-boundary/ErrorBoundary";
import { SearchPanel } from "../top/SearchPanel";
import { ResultList } from "../bottom/ResultList";

class App extends Component<object, { value: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      value: "",
    };
  }

  rerender = (value: string) => {
    this.setState({ value });
  };

  render() {
    return (
      <ErrorBoundary>
        <h1 className={style.header}>Hello Stranger!</h1>
        <SearchPanel rerender={this.rerender}></SearchPanel>
        <ResultList value={this.state.value}></ResultList>
      </ErrorBoundary>
    );
  }
}

export default App;
