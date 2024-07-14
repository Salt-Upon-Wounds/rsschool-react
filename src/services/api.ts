export interface Species {
  all: number;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
}

interface Responce {
  results: Species[];
  count: number;
  next: string;
  previous: string;
}

export async function getData(value?: string, page = 1): Promise<Species[]> {
  const url = `https://swapi.dev/api/species/?page=${page}`;
  let all = 0;

  return fetch(value?.length ? `${url}&search=${value.trim()}` : url)
    .then((data) => data.json())
    .then((data: Responce) => {
      all = data.count;
      return data.results.map((elem: Species) => {
        return {
          all,
          name: elem.name,
          classification: elem.classification,
          designation: elem.designation,
          average_height: elem.average_height,
          average_lifespan: elem.average_lifespan,
        };
      });
    });
}
