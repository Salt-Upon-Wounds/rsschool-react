import { Component } from "react";
import style from "./styles.module.scss";

type Props = {
  rerender: (value: string) => void;
};

export class SearchPanel extends Component<Props> {
  state: {
    value: string;
    err: boolean;
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      err: false,
    };
  }

  searchInput: HTMLInputElement | undefined;

  save = (value: string) => {
    localStorage.setItem("TaskSearch", value);
  };

  load = () => {
    const value = localStorage.getItem("TaskSearch");
    if (value && this.searchInput) {
      this.searchInput.value = value;
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
    const str = this.searchInput?.value ?? "";
    this.setState({ value: str });
    this.save(str);
    this.props.rerender(str);
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
        <button className={style.searchButton} onClick={this.search}>
          Search
        </button>
        <button className={style.errorButton} onClick={this.error}>
          Error
        </button>
      </div>
    );
  }
}
