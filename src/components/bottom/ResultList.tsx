import { SWApi, type Species } from "../../services/api";
import style from "./styles.module.scss";
import spinner from "../../assets/react.svg";
import { Pagination } from "../pagination/pagination";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { itemAdded, itemRemoved } from "../../redux/dataSlice";
import React, { useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";

interface Props {
  value: string;
  page: number;
  rerender: (page: number) => void;
}

export function ResultList(props: Props) {
  const savedData = useRef<Species[]>([]);

  // useSelector without re-render
  useSelector<{ api: unknown; data: Species[] }, Species[]>(
    (state) => state.data,
    (_, b) => {
      savedData.current = b; // <- collect the new value
      return true; // <- prevent re-render
    },
  );

  const dispatch = useDispatch();

  const { data, isLoading, isFetching } = SWApi.useGetSpeciesQuery({
    search: props.value,
    page: props.page,
  });

  function notFound() {
    return <p>Nothing found</p>;
  }

  function checkboxHandler(e: React.MouseEvent) {
    const input = e.currentTarget as HTMLInputElement;
    if (!input.checked && input.dataset.url) {
      dispatch(
        itemRemoved(
          savedData.current.filter((el) => el.url === input.dataset.url)[0],
        ),
      );
    } else if (data) {
      dispatch(itemAdded(data.filter((el) => el.url === input.dataset.url)[0]));
    }
  }

  function found() {
    return (
      <>
        {savedData.current
          .concat(
            data?.filter(
              (el: Species) =>
                savedData.current.findIndex((sel) => sel.url === el.url) === -1,
            ) ?? [],
          )
          .map((el: Species, id: number) => {
            return (
              <li key={nanoid()} className={style.elem}>
                <Link to={`/species/${el.url.split("/").slice(-2, -1)[0]}`}>
                  <p>Name: {el.name}</p>
                  <p>Classification: {el.classification}</p>
                  <p>Designation: {el.designation}</p>
                  <p>Average Height: {el.average_height}</p>
                  <p>Average Lifespan: {el.average_lifespan}</p>
                </Link>
                <input
                  type="checkbox"
                  data-url={el.url}
                  id={`checkbox${id}`}
                  defaultChecked={
                    savedData.current.findIndex((sel) => sel.url === el.url) >
                    -1
                  }
                  onClick={checkboxHandler}
                />
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
