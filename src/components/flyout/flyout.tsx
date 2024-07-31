import { useDispatch, useSelector } from "react-redux";
import style from "./styles.module.scss";
import { itemsClear } from "../../redux/dataSlice";
import { Species } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../app/App";

export function Flyout(props: { rerender: () => void }) {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const savedData = useSelector<{ api: unknown; data: Species[] }, Species[]>(
    (state) => state.data,
  );
  const [counter, setCounter] = useState(savedData.length);
  const [linkData, setLinkData] = useState<{ href: string; download: string }>({
    href: "",
    download: "",
  });
  useEffect(() => {
    setCounter(savedData.length);

    function convertToCSV(): [string, number] {
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
    }

    function downloadCSV() {
      const [blob, len] = convertToCSV();
      const csvData = new Blob([blob], { type: "text/csv" });
      const csvURL = URL.createObjectURL(csvData);
      setLinkData({ href: csvURL, download: `spieces_${len}.csv` });
    }

    downloadCSV();
  }, [savedData]);

  return (
    <div
      className={`${style.panel} ${counter ? style.active : ""} ${theme === "light" ? "" : style.dark}`}
    >
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
        <a href={linkData.href} download={linkData.download}>
          <button>Download</button>
        </a>
      </div>
    </div>
  );
}
