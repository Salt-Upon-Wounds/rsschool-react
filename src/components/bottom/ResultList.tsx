import { Component } from "react";
import { getData, type Species } from "../../services/api";
import style from "./styles.module.scss";
import spinner from "../../assets/react.svg";

interface Props {
  value: string;
}

export class ResultList extends Component<Props> {
  state: {
    result: Species[];
    loading: boolean;
  };
  key = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      result: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const value = localStorage.getItem("TaskSearch");

    this.setState({ loading: true });
    const result = await getData(value ?? "");
    this.setState({ result, loading: false });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value) {
      await this.componentDidMount();
    }
  }

  notFound() {
    return <p>Nothing found</p>;
  }

  found() {
    return this.state.result.map((el: Species) => {
      return (
        <li key={this.key++} className={style.elem}>
          <p>Name: {el.name}</p>
          <p>Classification: {el.classification}</p>
          <p>Designation: {el.designation}</p>
          <p>Average Height: {el.average_height}</p>
          <p>Average Lifespan: {el.average_lifespan}</p>
        </li>
      );
    });
  }

  result() {
    return !this.state.result.length ? this.notFound() : this.found();
  }

  render() {
    return (
      <ul className={style.wrapper}>
        {this.state.loading ? (
          <img src={spinner} alt="loading..." className={style.rotate} />
        ) : (
          this.result()
        )}
      </ul>
    );
  }
}
