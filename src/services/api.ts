export type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
};

export async function getData(value?: string) {
  const url = "https://swapi.dev/api/species/";

  return await fetch(
    value && value.length ? `${url}?search=${value.trim()}` : url,
  )
    .then((data) => data.json())
    .then((data) =>
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
