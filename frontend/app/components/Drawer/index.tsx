import { IoMenu } from "react-icons/io5";

interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
  children: React.ReactNode;
}

export const Drawer = ({ isDrawerOpen, setIsDrawerOpen, children }: DrawerProps) => {
  return (
    <div
      id="drawer-example"
      className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white w-80 dark:bg-project-gray-drawer pt-14`}
      aria-labelledby="drawer-label"
    >
      <button
        type="button"
        onClick={() => setIsDrawerOpen(false)}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <IoMenu size={24} className="text-project-blue-icon" />
        <span className="sr-only">Close menu</span>
      </button>

      {children}
    </div>
  );
};
