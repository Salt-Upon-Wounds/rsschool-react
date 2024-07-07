import { Component } from "react";
import { getData, type Species } from "../../services/api";
import style from "./styles.module.scss";

type Props = { value: string };

export class ResultList extends Component<Props> {
  state: {
    result: Species[];
  };
  key = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  async componentDidMount() {
    const value = localStorage.getItem("TaskSearch");
    const result = await getData(value ?? "");
    this.setState({ result });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value) {
      await this.componentDidMount();
    }
  }

  render() {
    return (
      <ul className={style.wrapper}>
        {!this.state.result.length ? (
          <p>Nothing found</p>
        ) : (
          this.state.result.map((el: Species) => {
            return (
              <li key={this.key++}>
                <p>Name: {el.name}</p>
                <p>Classification: {el.classification}</p>
                <p>Designation: {el.designation}</p>
                <p>Average Height: {el.average_height}</p>
                <p>Average Lifespan: {el.average_lifespan}</p>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}
