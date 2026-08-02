import { Outlet } from "react-router-dom";

import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

import { supabase } from "../../../lib/supabase";

export const AppLayout = () => {
    console.log(supabase);  
  return (
    <div
      className="
                grid
                h-screen
                grid-cols-[var(--sidebar-width)_1fr]
                bg-[var(--color-background)]
                text-white
              "
    >
      <Sidebar />

      <div
        className="
                    grid
                    grid-rows-[var(--header-height)_1fr]
                    overflow-hidden    
                  "
      >
        <Header />

        <main className="overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
