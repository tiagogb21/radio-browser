import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { mockRadios } from '../mocks/mockRadios';
import { RadioCard } from '../../app/components/common/RadioCard';
import { FavoriteList } from '../../app/components/FavoritesList';
import type { IRadio } from '../../app/types/interfaces/IRadio';

const mockHandlePlayStop = jest.fn();
const mockAddToFavorites = jest.fn();
const mockRemoveFromFavorites = jest.fn();
const mockHandleUpdateFavorite = jest.fn();

describe("RadioList Component", () => {
  const renderRadioList = (radioSearch = "", playingRadio = "") =>
    render(
      <FavoriteList
        favorites={mockRadios}
        search={radioSearch}
        playingRadio={playingRadio}
        handlePlayStop={mockHandlePlayStop}
        removeFromFavorites={mockRemoveFromFavorites}
        handleUpdateFavorite={mockHandleUpdateFavorite}
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

  it.only("should handle play/stop interaction correctly", () => {
    const { asFragment } = renderRadioList("", "http://radioone.com/stream");

    const stopButton = screen.getByRole("button", { name: /stop/i });
    expect(stopButton).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(stopButton);
    expect(mockHandlePlayStop).toHaveBeenCalledWith("http://radioone.com/stream");
  });

  describe("RadioCard Component", () => {
    const mockRemoveFromFavorites = jest.fn();
    const mockOnUpdate = jest.fn();

    const renderRadioCard = (radio: IRadio, playingRadio = "") =>
      render(
        <RadioCard
          radio={radio}
          playingRadio={playingRadio}
          handlePlayStop={mockHandlePlayStop}
          addToFavorites={mockAddToFavorites}
          removeFromFavorites={mockRemoveFromFavorites}
          onUpdate={mockOnUpdate}
          hasOption={true}
        />
      );

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should display play button when radio is not playing", () => {
      renderRadioCard(mockRadios[0]);

      const playButton = screen.getByRole("button", { name: /play/i });
      expect(playButton).toBeInTheDocument();
    });

    it("should display stop button when radio is playing", () => {
      renderRadioCard(mockRadios[0], "http://radioone.com/stream");

      const stopButton = screen.getByRole("button", { name: /stop/i });
      expect(stopButton).toBeInTheDocument();
    });

    it("should allow removing radio from favorites", () => {
      renderRadioCard(mockRadios[0]);

      const removeButton = screen.getByRole("button", { name: /trash/i });
      fireEvent.click(removeButton);

      expect(mockRemoveFromFavorites).toHaveBeenCalledWith("1");
    });

    it("should open and close the edit modal", () => {
      renderRadioCard(mockRadios[0]);

      const editButton = screen.getByRole("button", { name: /pencil/i });
      fireEvent.click(editButton);

      expect(screen.getByText("Save Changes")).toBeInTheDocument();

      const saveButton = screen.getByRole("button", { name: /save changes/i });
      fireEvent.click(saveButton);

      expect(mockOnUpdate).toHaveBeenCalledWith({
        ...mockRadios[0],
        name: "Radio One",
      });
    });
  });
});
