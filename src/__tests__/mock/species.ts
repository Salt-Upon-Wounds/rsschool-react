import { Species } from "../../services/api";
import { BASE_URL } from "../setupTests";

export const speciesMock: Species = {
  all: 1,
  name: "test",
  classification: "test",
  designation: "test",
  average_height: "test",
  average_lifespan: "test",
  url: `${BASE_URL}/species/1/`,
  homeworld: `${BASE_URL}/planets/1/`,
};
