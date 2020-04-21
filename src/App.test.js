import React from "react";
import { render, act, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

import { dataSet } from "./dataSet";

jest.mock("./api/fetchShow");

test("renders my episodes once loaded and the season is selected", async () => {
  act(() => {
    mockFetchShow.mockResolvedValueOnce(dataSet);
  });
  const { queryAllByTestId, getByText, queryByText, debug } = render(<App />);

  waitForElementToBeRemoved(queryByText(/Fetching data.../i)).then(() => {
    const selection = getByText(/Select a season/i);
    userEvent.click(selection, "Select a season");

    const season = getByText(/season 1/i);

    userEvent.click(season);

    expect(queryAllByTestId(/episode/i)).toHaveLength(3);
  });
});
