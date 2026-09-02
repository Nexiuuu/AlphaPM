import { Outlet } from "react-router-dom";

import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { TriangularGrid } from "../../decorations/background/triangular/TriangularGrid";
import { useFlash } from "../../../hooks/animations/useFlash";
import { WorkspacesProvider } from "../../../features/workspaces/WorkspacesContext";

export const AppLayout = () => {
  const { active, finish } = useFlash();

  return (
    <WorkspacesProvider>
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
            min-h-screen
            w-full
            flex-col
          "
        >
          <Header />

        <main className="relative w-full h-full">
          <div className="absolute inset-0 z-1 pointer-events-none w-full h-full overflow-hidden">
            {active && (
              <div className="animations-flash" onAnimationEnd={finish}></div>
            )}
            <TriangularGrid
              gap={8}
              trianglesCount={{ wider: 30, narrower: 10 }}
              autoTranslate={true}
              className="w-[120%] h-[120%]"
            />
          </div>

          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
        </div>
      </div>
    </WorkspacesProvider>
  );
};
