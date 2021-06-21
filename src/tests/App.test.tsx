import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import App from "../App";
import { data } from "./query.mocks";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CHARACTERS } from "../apollo";

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: data,
  },
];

describe("App tests", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );
  });

  test("loads on init", () => {
    const loadElement = screen.getByText(/loading.../i);
    expect(loadElement).toBeInTheDocument();
  });

  test("renders loading", () => {
    const logoElement = screen.getByText(/slick rick/i);
    expect(logoElement).toBeInTheDocument();
  });

  test("renders cards", async () => {

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    
    const logoElement = screen.getByText(/morty smith/i);
    await waitFor(() => {
      expect(logoElement).toBeInTheDocument();
    });

  });
});
