import { useDispatch, useSelector } from "react-redux";
import style from "./styles.module.scss";
import { itemsClear } from "../../redux/dataSlice";
import { Species } from "../../services/api";
import { useEffect, useState } from "react";

export function Flyout(props: { rerender: () => void }) {
  const dispatch = useDispatch();

  const savedData = useSelector<{ api: unknown; data: Species[] }, Species[]>(
    (state) => state.data,
  );
  const [counter, setCounter] = useState(savedData.length);
  useEffect(() => {
    setCounter(savedData.length);
  }, [savedData]);

  return (
    <div className={`${style.panel} ${counter ? style.active : ""}`}>
      <p className={style.text}>{counter} items selected</p>
      <div className={style.wrapper}>
        <button
          onClick={() => {
            dispatch(itemsClear());
            props.rerender();
          }}
        >
          Unselect all
        </button>
        <button>Download</button>
      </div>
    </div>
  );
}
