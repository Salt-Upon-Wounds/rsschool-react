import style from "./styles.module.scss";

export function Flyout() {
  return (
    <div className={`${style.panel} ${style.active}`}>
      <p className={style.text}>3 items selected</p>
      <div className={style.wrapper}>
        <button>Unselect all</button>
        <button>Download</button>
      </div>
    </div>
  );
}
