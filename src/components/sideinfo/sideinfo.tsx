import { useNavigate, useParams } from "react-router-dom";
import { SWApi } from "../../services/api";
import style from "./styles.module.scss";
import spinner from "../../assets/react.svg";

export function Sideinfo() {
  const { id } = useParams();
  /* const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(""); */
  const navigate = useNavigate();

  const {
    data: species,
    isLoading: isLoadingSpecies,
    isFetching: isFetchingSpecies,
  } = SWApi.useGetSpeciesByIdQuery(id ?? "1");

  const {
    data: planet,
    isLoading: isLoadingPlanet,
    isFetching: isFetchingPlanet,
  } = SWApi.useGetPlanetByIdQuery(
    species?.homeworld?.replace(/[^0-9]+/g, "") ?? "",
  );

  function handler() {
    navigate("/");
  }

  return (
    <div className={style.wrapper}>
      {isLoadingPlanet ||
      isFetchingPlanet ||
      isLoadingSpecies ||
      isFetchingSpecies ? (
        <img
          src={spinner}
          alt="loading..."
          className={`${style.rotate} ${style.top}`}
        />
      ) : (
        <div className={style.top}>
          <p>
            This creature is from:
            <br />
            {planet ?? "n/a"}
          </p>
          <button onClick={handler}>Close</button>
        </div>
      )}
    </div>
  );
}
