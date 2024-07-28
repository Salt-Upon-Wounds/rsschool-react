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

  const convertToCSV = (): [string, number] => {
    const array = savedData;
    let str = "";

    for (const el of array) {
      let line = "";
      for (const [, val] of Object.entries(el)) {
        if (line !== "") line += ",";
        line += val;
      }
      str += line + "\r\n";
    }
    return [str, array.length];
  };

  const downloadCSV = () => {
    const [blob, len] = convertToCSV();
    const csvData = new Blob([blob], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `spieces_${len}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <button onClick={downloadCSV}>Download</button>
      </div>
    </div>
  );
}
