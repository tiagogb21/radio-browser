import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockRadios } from "../mocks/mockRadios";
import { FavoriteList } from "../../app/components/FavoritesList";

const mockHandlePlayStop = jest.fn();
const mockOnUpdate = jest.fn();
const mockRemoveFromFavorites = jest.fn();
const mockHandleUpdateFavorite = jest.fn();

describe("FavoriteList Component", () => {
  const renderFavoriteList = (radioSearch = "", playingRadio = "") =>
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
    renderFavoriteList();

    expect(screen.getByText("Radio One")).toBeInTheDocument();
    expect(screen.getByText("Radio Two")).toBeInTheDocument();
  });

  it("should filter radios based on the search term (by name)", () => {
    renderFavoriteList("Radio One");

    expect(screen.getByText("Radio One")).toBeInTheDocument();
    expect(screen.queryByText("Radio Two")).not.toBeInTheDocument();
  });

  it("should filter radios based on the search term (by country)", () => {
    renderFavoriteList("USA");

    expect(screen.getByText("Radio Two")).toBeInTheDocument();
    expect(screen.queryByText("Radio One")).not.toBeInTheDocument();
  });

  it("should handle play/stop interaction correctly", () => {
    const { asFragment } = renderFavoriteList("", "http://radioone.com/stream");

    const stopButton = screen.getByTestId("button-play-stop-1");
    expect(stopButton).toBeInTheDocument();

    fireEvent.click(stopButton);
    expect(mockHandlePlayStop).toHaveBeenCalledWith(
      "http://radioone.com/stream"
    );
  });

  it("should open and close the edit modal", () => {
    renderFavoriteList();

    const editButton = screen.getByTestId("button-pencil-1");
    fireEvent.click(editButton);

    const saveButton = screen.getByTestId("button-save-edit");
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);

    expect(mockHandleUpdateFavorite).toHaveBeenCalledWith({
      ...mockRadios[0],
      name: "Radio One",
    });
  });

  it("should allow removing radio from favorites", () => {
    renderFavoriteList();

    const removeButton = screen.getByTestId("button-trash-1");
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(
      mockRadios[0].changeuuid
    );
  });
});
