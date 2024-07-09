export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
}

interface Responce {
  results: Species[];
}

export async function getData(value?: string): Promise<Species[]> {
  const url = "https://swapi.dev/api/species/";

  return fetch(value?.length ? `${url}?search=${value.trim()}` : url)
    .then((data) => data.json())
    .then((data: Responce) =>
      data.results.map((elem: Species) => {
        return {
          name: elem.name,
          classification: elem.classification,
          designation: elem.designation,
          average_height: elem.average_height,
          average_lifespan: elem.average_lifespan,
        };
      }),
    );
}
