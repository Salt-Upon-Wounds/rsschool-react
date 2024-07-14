import { ChangeEvent, useState } from "react";
import style from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";

interface Props {
  initvalue: string;
  rerender: (value: string) => void;
  save: (value: string) => void;
}

export function SearchPanel(props: Props) {
  const [value, setValue] = useState(props.initvalue);
  const [err, setErr] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = () => {
    const str = value;
    props.rerender(str);
    searchParams.set("search", str);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const error = () => {
    setErr(true);
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.save(e.target.value);
  };

  //if (this.state.err) throw new Error('test error');
  return (
    <div className={style.wrapper}>
      {err
        ? (() => {
            throw new Error("test error");
          })()
        : ""}
      <input
        type="text"
        className={style.searchInput}
        placeholder="type to search..."
        value={value}
        onChange={change}
      />
      <button className={style.searchButton} onClick={search}>
        Search
      </button>
      <button className={style.errorButton} onClick={error}>
        Error
      </button>
    </div>
  );
}
