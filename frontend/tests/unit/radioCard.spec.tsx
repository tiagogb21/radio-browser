import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { mockRadios } from '../mocks/mockRadios';
import { RadioCard } from '../../app/components/common/RadioCard';
import type { IRadio } from '../../app/types/interfaces/IRadio';

const mockHandlePlayStop = jest.fn();
const mockAddToFavorites = jest.fn();

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

    const playButton = screen.getByTestId("button-play-stop-1");
    expect(playButton).toBeInTheDocument();
  });

  it("should display stop button when radio is playing", () => {
    renderRadioCard(mockRadios[0], "http://radioone.com/stream");

    const stopButton = screen.getByTestId("button-play-stop-1");
    expect(stopButton).toBeInTheDocument();
  });
});