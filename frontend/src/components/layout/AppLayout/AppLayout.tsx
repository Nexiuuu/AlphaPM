import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { TriangularGrid } from "../../decorations/background/triangular/TriangularGrid";
import { useFlash } from "../../../hooks/animations/useFlash";
import { WorkspacesProvider } from "../../../features/workspaces/WorkspacesContext";

export const AppLayout = () => {
  const { active, finish } = useFlash();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <WorkspacesProvider>
      <div
        className={`
          grid
          min-h-screen
          min-w-0
          grid-cols-1
          transition-[grid-template-columns]
          duration-300
          ease-in-out
          ${
            isSidebarCollapsed
              ? "md:grid-cols-[var(--sidebar-width-collapsed)_minmax(0,1fr)]"
              : "md:grid-cols-[var(--sidebar-width-expanded)_minmax(0,1fr)]"
          }
          bg-[var(--color-background)]
          text-[var(--color-text)]
        `}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={() => setIsSidebarCollapsed((current) => !current)}
          onExpand={() => setIsSidebarCollapsed(false)}
        />

        <div className="flex min-h-screen min-w-0 flex-col">
          <Header />

          <main className="relative min-w-0 flex-1 overflow-x-hidden">
            <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
              {active && (
                <div className="animations-flash" onAnimationEnd={finish} />
              )}

              <TriangularGrid
                gap={8}
                trianglesCount={{ wider: 30, narrower: 10 }}
                autoTranslate={true}
                className="h-[120%] w-[120%]"
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
