import { Outlet } from "react-router-dom";

import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

export const AppLayout = () => {
  return (
    <div
      className="
        grid
        min-h-screen
        w-full
        grid-cols-[var(--sidebar-width-expanded)_1fr]
        bg-[var(--color-background)]
        text-[var(--color-text)]
      "
    >
      <Sidebar />

      <div
        className="
          flex
          flex-col
          w-full
          min-h-screen
        "
      >
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};