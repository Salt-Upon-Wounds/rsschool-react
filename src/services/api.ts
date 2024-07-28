import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Species {
  all: number;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  url: string;
  homeworld: string;
}

export interface SpeciesResponce {
  results: Species[];
  count: number;
  next: string;
  previous: string;
}

export const SWApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getSpecies: builder.query<Species[], { search?: string; page: number }>({
      query: (args) => {
        if (args.page && args.page < 1) args.page = 1;
        return `species/${args.search?.length ? `${`?page=${args.page}`}&search=${args.search.trim()}` : `?page=${args.page}`}`;
      },
      transformResponse: (data: SpeciesResponce) => {
        const all = data.count;
        return data.results.map((elem: Species) => {
          return {
            all,
            name: elem.name,
            classification: elem.classification,
            designation: elem.designation,
            average_height: elem.average_height,
            average_lifespan: elem.average_lifespan,
            homeworld: elem.homeworld,
            url: elem.url,
          };
        });
      },
    }),
    getSpeciesById: builder.query<Species, string>({
      query: (id: string) => `species/${id}/`,
    }),
    getPlanetById: builder.query<string, string>({
      query: (id: string) => `planets/${id}/`,
      transformResponse: (data: Record<string, string>) => data.name,
    }),
  }),
});

export async function getInfoAbout(id: string) {
  return fetch(`https://swapi.dev/api/species/${id}/`)
    .then((data) => data.json())
    .then((data: Record<string, string>) =>
      fetch(data.homeworld)
        .then((data) => data.json())
        .then((data: Record<string, string>) => data.name),
    );
}
