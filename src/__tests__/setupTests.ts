import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { speciesMock } from "./mock/species";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

export const BASE_URL = "https://swapi.dev/api/";

export const server = setupServer(
  http.get(`${BASE_URL}species/`, () => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [speciesMock],
    });
  }),
  http.get(`${BASE_URL}species/:id`, () => {
    return HttpResponse.json(speciesMock);
  }),
  http.get(`${BASE_URL}planets/:id`, () => {
    return HttpResponse.json({ name: "TESTPLANET" });
  }),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

global.URL.createObjectURL = vi.fn();
