import { useParams } from "react-router-dom";

export function Sideinfo() {
  const { name } = useParams();

  return <div>Hi world {name}</div>;
}
