import { CalendarDays, ListTodo } from "lucide-react";

import { LoadingText } from "../../components/ui/LoadingText/LoadingText";
import { useWorkspaces } from "../../features/workspaces/useWorkspaces";
import { DashboardEmptyState } from "../../features/dashboard/DashboardContent/DashboardEmptyState";
import { DashboardHeader } from "../../features/dashboard/DashboardContent/DashboardHeader";
import { DashboardPlaceholder } from "../../features/dashboard/DashboardContent/DashboardPlaceholder";
import { RecentProjects } from "../../features/dashboard/DashboardContent/RecentProjects";
import { DashboardStats } from "../../features/dashboard/DashboardStats/DashboardStats";

export const DashboardPage = () => {
  const { workspaces, isAuthenticated, isLoading, error } = useWorkspaces();

  return (
    <section className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <DashboardHeader />

      {isLoading ? (
        <p className="text-sm text-[var(--color-text-muted)]">
          <LoadingText label="Sprawdzanie sesji" />
        </p>
      ) : !isAuthenticated ? (
        <DashboardEmptyState />
      ) : (
        <>
          <DashboardStats
            projectsCount={workspaces.length}
            isLoading={false}
          />

          {error && (
            <p className="mt-4 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 px-4 py-3 text-sm">
              Nie udało się pobrać projektów: {error}
            </p>
          )}

          <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
            <RecentProjects workspaces={workspaces} isLoading={isLoading} />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <DashboardPlaceholder
                icon={<ListTodo size={19} />}
                label="Moje priorytety"
                title="Zadania pojawią się tutaj"
                description="Gdy moduł zadań będzie gotowy, Dashboard pokaże najbliższe i zaległe elementy pracy."
                linkLabel="Przejdź do zadań"
                to="/tasks"
              />

              <DashboardPlaceholder
                icon={<CalendarDays size={19} />}
                label="Najbliższe terminy"
                title="Brak terminów do wyświetlenia"
                description="Terminy z projektów i zadań będą zebrane w jednym miejscu."
                linkLabel="Otwórz kalendarz"
                to="/calendar"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};
