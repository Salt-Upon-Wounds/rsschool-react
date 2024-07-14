import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInfoAbout } from "../../services/api";
import style from "./styles.module.scss";
import spinner from "../../assets/react.svg";

export function Sideinfo() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    void getInfoAbout(id ?? "1").then((data) => {
      setResult(data);
      setLoading(false);
    });
  }, [id]);

  function handler() {
    navigate("/");
  }

  return (
    <div className={style.wrapper}>
      {loading ? (
        <img src={spinner} alt="loading..." className={style.rotate} />
      ) : (
        <div>
          <p>
            This creature is from:
            <br />
            {result}
          </p>
          <button onClick={handler}>Close</button>
        </div>
      )}
    </div>
  );
}
