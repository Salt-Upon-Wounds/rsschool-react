import { useEffect, useState } from "react";
import { getData, type Species } from "../../services/api";
import style from "./styles.module.scss";
import spinner from "../../assets/react.svg";
import { Pagination } from "../pagination/pagination";
import { Link } from "react-router-dom";

interface Props {
  value: string;
  page: number;
  rerender: (page: number) => void;
}

export function ResultList(props: Props) {
  let key = 0;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Species[]>([]);
  useEffect(() => {
    setLoading(true);
    void getData(props.value ?? "", props.page).then((data) => {
      setResult(data);
      setLoading(false);
    });
  }, [props.value, props.page]);

  function notFound() {
    return <p>Nothing found</p>;
  }

  function found() {
    return (
      <>
        {result.map((el: Species) => {
          return (
            <li key={key++} className={style.elem}>
              <Link to={`/species/${el.name}`}>
                <p>Name: {el.name}</p>
                <p>Classification: {el.classification}</p>
                <p>Designation: {el.designation}</p>
                <p>Average Height: {el.average_height}</p>
                <p>Average Lifespan: {el.average_lifespan}</p>
              </Link>
            </li>
          );
        })}
        <Pagination
          page={props.page}
          length={Math.ceil(result[0].all / 10)}
          rerender={props.rerender}
        ></Pagination>
      </>
    );
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
