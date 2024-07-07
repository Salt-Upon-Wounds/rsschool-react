import { Component } from "react";
import style from "./styles.module.scss";

export class SearchPanel extends Component {
  state = {
    value: "",
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
    this.searchInput =
      document.querySelector<HTMLInputElement>("#search") ?? undefined;
    if (!this.searchInput) {
      throw new Error("search input not found");
    }
    this.load();
  }

  search = () => {
    this.setState({ value: this.searchInput?.value ?? "" });
    this.save(this.searchInput?.value ?? "");
  };

  error = () => {
    throw new Error("error");
  };

  render() {
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
