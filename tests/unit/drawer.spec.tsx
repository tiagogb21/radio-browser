import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Drawer } from "../../app/components/Drawer";

describe("Drawer Component", () => {
  const mockSetIsDrawerOpen = jest.fn();

  const renderDrawer = (isDrawerOpen: boolean, children: React.ReactNode) =>
    render(
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={mockSetIsDrawerOpen} page={1} setPage={()=>1}>
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

  it("should have 'translate-x-0' class for large screens when drawer is open", () => {
    renderDrawer(true, <div>Drawer Content</div>);

    const drawer = screen.getByTestId("drawer-radios");

    expect(drawer).toHaveClass("md:translate-x-0");
  });

  it("should have '-translate-x-full' class for large screens when drawer is closed", () => {
    renderDrawer(false, <div>Drawer Content</div>);

    const drawer = screen.getByTestId("drawer-radios");

    expect(drawer).toHaveClass("md:-translate-x-full");
  });

  it("should have 'translate-y-0' class for small screens when drawer is open", () => {
    renderDrawer(true, <div>Drawer Content</div>);

    const drawer = screen.getByTestId("drawer-radios");

    expect(drawer).toHaveClass("translate-y-0");
  });

  it("should have '-translate-y-full' class for small screens when drawer is closed", () => {
    renderDrawer(false, <div>Drawer Content</div>);

    const drawer = screen.getByTestId("drawer-radios");

    expect(drawer).toHaveClass("-translate-y-full");
  });

  it("should call setIsDrawerOpen(false) when close button is clicked", () => {
    renderDrawer(true, <div>Drawer Content</div>);

    const closeButton = screen.getByTestId("close-drawer");
    fireEvent.click(closeButton);

    expect(mockSetIsDrawerOpen).toHaveBeenCalledWith(false);
  });
});
