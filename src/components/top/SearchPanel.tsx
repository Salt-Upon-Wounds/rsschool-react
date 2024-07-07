import { Component } from "react";
import style from "./styles.module.scss";

export class SearchPanel extends Component {
  state = {
    value: "",
    err: false,
  };

  searchInput: HTMLInputElement | undefined;

  save = (value: string) => {
    localStorage.setItem("TaskSearch", value);
  };

  load = () => {
    const value = localStorage.getItem("TaskSearch");
    if (value) {
      this.setState({ value });
    }
  };

  componentDidMount() {
    console.log(style.searchInput);
    this.searchInput =
      document.querySelector<HTMLInputElement>(`.${style.searchInput}`) ??
      undefined;
    if (!this.searchInput) {
      throw new Error("search input not found");
    }
    this.load();
  }

  search = () => {
    this.setState({ value: this.searchInput?.value ?? "" });
    this.save(this.searchInput?.value ?? "");
    window.dispatchEvent(
      new CustomEvent<string>("search", {
        detail: this.searchInput?.value ?? "",
      }),
    );
  };

  error = () => {
    this.setState({ err: true });
  };

  render() {
    if (this.state.err) throw new Error("test error");
    return (
      <div className={style.wrapper}>
        <input
          type="text"
          className={style.searchInput}
          placeholder="type to search..."
        />
        <button className={style.searchButton} onClick={this.error}>
          Search
        </button>
        <button className={style.errorButton} onClick={this.error}>
          Error
        </button>
      </div>
    );
  }
}
