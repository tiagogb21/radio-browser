import React from 'react';
import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

describe("Home", () => {
  it("renders drawer", () => {
    render(<Home />);

    const buttonDrawer = screen.getByRole("button", {
      name: /menu/i,
    });

    expect(buttonDrawer).toBeInTheDocument();
  })
});