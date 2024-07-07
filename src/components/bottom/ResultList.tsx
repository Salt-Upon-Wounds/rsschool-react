import { Component } from "react";
import { getData, type Species } from "../../services/api";
import style from "./styles.module.scss";

type Props = { value: string };

export class ResultList extends Component<Props> {
  state: {
    result: Species[];
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  async componentDidMount() {
    const value = localStorage.getItem("TaskSearch");
    if (value) {
      await getData(value);
    } else {
      await getData();
    }
  }

  render() {
    return <div className={style.wrapper}>{this.props.value}</div>;
  }
}
