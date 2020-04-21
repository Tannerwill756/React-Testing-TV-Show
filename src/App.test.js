import React from "react";
import { render, act, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

jest.mock("./api/fetchShow");

const episodesData = [
  {
    id: 553946,
    url:
      "http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
    name: "Chapter One: The Vanishing of Will Byers",
    season: 1,
    number: 1,
    airdate: "2016-07-15",
    airtime: "",
    airstamp: "2016-07-15T12:00:00+00:00",
    runtime: 60,
    image: {
      medium:
        "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
      original:
        "http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg",
    },
    summary:
      "<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>",
    _links: { self: { href: "http://api.tvmaze.com/episodes/553946" } },
  },
];

// test("App is rendering", () => {
//   mockFetchShow.mockResolvedValueOnce(episodesData);

//   const { getByText, queryAllByTestId, debug } = render(<App />);
//   debug();
//   const select = getByText(/select a season/i);
//   // console.log(select);

//   await waitFor(() => {expect(queryAllByTestId(/episodes/i)).toBeVisible();
//   fireEvent.click(getByText(/select a season/i))
//   });

// });
test("renders once loaded", async () => {
  act(() => {
    mockFetchShow.mockResolvedValueOnce(episodesData);

    const { getByPlaceholderText, queryByText } = render(<App />);
    waitForElementToBeRemoved(queryByText(/Fetching data.../i)).then(() => {
      const selection = getByPlaceholderText("Select an option");
      selection.value = "Season 2";
      expect(selection).toHaveValue("Season 2");
    });
  });
});
