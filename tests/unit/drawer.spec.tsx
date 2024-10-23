import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Drawer } from "../../app/components/Drawer";

describe("Drawer Component", () => {
  const mockSetIsDrawerOpen = jest.fn();

  const renderDrawer = (isDrawerOpen: boolean, children: React.ReactNode) =>
    render(
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={mockSetIsDrawerOpen}>
        {children}
      </Drawer>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Drawer component with children", () => {
    renderDrawer(true, <div>Drawer Content</div>);

    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("should have 'translate-x-0' class when drawer is open", () => {
    renderDrawer(true, <div>Drawer Content</div>);

    const drawer = screen.getByTestId("drawer-radios");

    expect(drawer).toHaveClass("translate-x-0");
  });

  it("should have '-translate-x-full' class when drawer is closed", () => {
    renderDrawer(false, <div>Drawer Content</div>);

    const drawer = screen.getByTestId("drawer-radios");

    expect(drawer).toHaveClass("-translate-x-full");
  });

  it("should call setIsDrawerOpen(false) when close button is clicked", () => {
    renderDrawer(true, <div>Drawer Content</div>);

    const closeButton = screen.getByRole("button", { name: /close menu/i });
    fireEvent.click(closeButton);

    expect(mockSetIsDrawerOpen).toHaveBeenCalledWith(false);
  });
});
