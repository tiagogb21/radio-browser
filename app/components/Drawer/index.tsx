import React from "react";
import { IoMenu } from "react-icons/io5";
import { Pagination } from "../Pagination";

interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
  children: React.ReactNode;
  page: number;
  setPage: (page: number) => void;
}

export const Drawer = ({ isDrawerOpen, setIsDrawerOpen, children, page, setPage }: DrawerProps) => {
  return (
    <div
      data-testid="drawer-radios"
      className={`w-full md:w-80 no-scrollbar fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
        isDrawerOpen ? "translate-y-0 md:translate-x-0" : "-translate-y-full md:translate-y-0 md:-translate-x-full"
      } bg-white dark:bg-project-gray-drawer pt-14`}
      aria-labelledby="drawer-label"
    >
      <button
        type="button"
        onClick={() => setIsDrawerOpen(false)}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-testid="close-drawer"
        aria-label="Close Drawer"
        aria-labelledby="closeDrawer"
      >
        <IoMenu size={24} className="text-project-blue-icon" />
        <span className="sr-only">Close menu</span>
      </button>
      {children}
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};
