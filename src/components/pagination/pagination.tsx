import style from "./style.module.scss";

interface Props {
  page: number;
  length: number;
  rerender: (page: number) => void;
}

export function Pagination(props: Props) {
  const left = () => {
    if (props.page - 1 > 0) {
      props.rerender(props.page - 1);
    }
  };

  const right = () => {
    if (props.page + 1 <= props.length) {
      props.rerender(props.page + 1);
    }
  };

  return (
    <div className={style.wrapper}>
      <button onClick={left}>{"<"}</button>
      <p>
        {props.page} / {props.length}
      </p>
      <button onClick={right}>{">"}</button>
    </div>
  );
}
