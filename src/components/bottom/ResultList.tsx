import { SWApi, type Species } from "../../services/api";
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

  const { data, isLoading, isFetching } = SWApi.useGetSpeciesQuery({
    search: props.value,
    page: props.page,
  });

  function notFound() {
    return <p>Nothing found</p>;
  }

  function found() {
    return (
      <>
        {data?.map((el: Species, id: number) => {
          return (
            <li key={key++} className={style.elem}>
              <Link to={`/species/${el.url.split("/").slice(-2, -1)[0]}`}>
                <p>Name: {el.name}</p>
                <p>Classification: {el.classification}</p>
                <p>Designation: {el.designation}</p>
                <p>Average Height: {el.average_height}</p>
                <p>Average Lifespan: {el.average_lifespan}</p>
              </Link>
              <input type="checkbox" id={`checkbox${id}`}></input>
              <label htmlFor={`checkbox${id}`}>save</label>
            </li>
          );
        })}
        <Pagination
          page={props.page}
          length={data ? Math.ceil(data[0]?.all / 10) : 0}
          rerender={props.rerender}
        ></Pagination>
      </>
    );
  }

  function final() {
    return data && data?.length > 0 ? found() : notFound();
  }

  return (
    <ul className={style.wrapper}>
      {isLoading || isFetching ? (
        <img src={spinner} alt="loading..." className={style.rotate} />
      ) : (
        final()
      )}
    </ul>
  );
}
