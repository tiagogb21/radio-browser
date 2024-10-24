import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { RadioList } from "../../app/components/RadioList";
import { mockRadios } from '../mocks/mockRadios';

const mockHandlePlayStop = jest.fn();
const mockAddToFavorites = jest.fn();

describe("RadioList Component", () => {
  const renderRadioList = (radioSearch = "", playingRadio = "", selectedRadios = []) =>
    render(
      <RadioList
        radios={mockRadios}
        radioSearch={radioSearch}
        playingRadio={playingRadio}
        handlePlayStop={mockHandlePlayStop}
        addToFavorites={mockAddToFavorites}
        selectedRadios={selectedRadios}
      />
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render all radios when no search term is provided", () => {
    renderRadioList();

    expect(screen.getByText("Radio One")).toBeInTheDocument();
    expect(screen.getByText("Radio Two")).toBeInTheDocument();
  });

  it("should filter radios based on the search term (by name)", () => {
    renderRadioList("Radio One");

    expect(screen.getByText("Radio One")).toBeInTheDocument();
    expect(screen.queryByText("Radio Two")).not.toBeInTheDocument();
  });

  it("should filter radios based on the search term (by country)", () => {
    renderRadioList("USA");

    expect(screen.getByText("Radio Two")).toBeInTheDocument();
    expect(screen.queryByText("Radio One")).not.toBeInTheDocument();
  });

  it("should allow adding a radio to favorites", () => {
    renderRadioList();

    const radioCard = screen.getByText("Radio One");
    fireEvent.click(radioCard);

    expect(mockAddToFavorites).toHaveBeenCalledWith(mockRadios[0]);
  });
});
