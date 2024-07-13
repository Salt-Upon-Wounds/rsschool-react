import { useEffect, useState } from "react";
import { getData, type Species } from "../../services/api";
import style from "./styles.module.scss";
import spinner from "../../assets/react.svg";

interface Props {
  value: string;
}

export function ResultList(props: Props) {
  let key = 0;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Species[]>([]);
  useEffect(() => {
    setLoading(true);
    void getData(props.value ?? "").then((data) => {
      setResult(data);
      setLoading(false);
    });
  }, [props.value]);

  function notFound() {
    return <p>Nothing found</p>;
  }

  function found() {
    return result.map((el: Species) => {
      return (
        <li key={key++} className={style.elem}>
          <p>Name: {el.name}</p>
          <p>Classification: {el.classification}</p>
          <p>Designation: {el.designation}</p>
          <p>Average Height: {el.average_height}</p>
          <p>Average Lifespan: {el.average_lifespan}</p>
        </li>
      );
    });
  }

  function final() {
    return !result.length ? notFound() : found();
  }

  return (
    <ul className={style.wrapper}>
      {loading ? (
        <img src={spinner} alt="loading..." className={style.rotate} />
      ) : (
        final()
      )}
    </ul>
  );
}
