import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../app/page";
import { RadiosContext } from '../../app/context/RadioContext';
import { mockRadios } from '../mocks/mockRadios';

const renderHomeWithContext = () => {
  const fetchRadios = jest.fn();

  return render(
    <RadiosContext.Provider
      value={{ radios: mockRadios, fetchRadios }}
    >
      <Home />
    </RadiosContext.Provider>
  );
};

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders drawer and toggle button", () => {
    renderHomeWithContext();

    const buttonDrawer = screen.getByRole("button", {
      name: /open drawer/i,
    });

    expect(buttonDrawer).toBeInTheDocument();
  });

  it("renders the SearchBar component", () => {
    renderHomeWithContext();

    const searchBar = screen.getByTestId("search-radios");
    expect(searchBar).toBeInTheDocument();
  });

  it("renders the radio list in the drawer", async () => {
    renderHomeWithContext();

    await waitFor(() => {
      const radioOne = screen.getByText("Radio One");
      const radioTwo = screen.getByText("Radio Two");

      expect(radioOne).toBeInTheDocument();
      expect(radioTwo).toBeInTheDocument();
    });
  });
});