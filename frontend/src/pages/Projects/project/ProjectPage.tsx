import { FolderKanban, SquareCheckBigIcon } from "lucide-react";
import { useProjectTasks } from "../../../hooks/useProject";
import { ModulePage } from "../../ModulePage";
import { ProjectProvider } from "../../../features/project/ProjectProvider";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../NotFoundPage";
import { StatCard } from "../../../features/dashboard/DashboardStats/StatCard";

export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFoundPage />;

  return (
    <ProjectProvider id={id}>
      <ProjectContent />
    </ProjectProvider>
  );
};

const ProjectContent = () => {
  const { /*tasks, isAuthenticated,*/ isLoading, error } = useProjectTasks();

  return (
    <ModulePage
      icon={FolderKanban}
      eyebrow="Twoja przestrzeń pracy"
      title="Projekt"
      description="Zarządzaj projektem"
      emptyTitle="Raporty pojawią się tutaj"
      emptyDescription="Gdy zadania zaczną trafiać do projektów, pokażemy wykresy postępu i obciążenia zespołu."
    >
      {error ? (
        <p className="mt-4 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 px-4 py-3 text-sm">
          Nie udało się pobrać danych projektu: {error}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <StatCard
            label="Aktywne zadania"
            value={"-"}
            description="Aktywne zadania w tym projekcie"
            icon={<SquareCheckBigIcon size={19} />}
            isLoading={isLoading}
          />
          <StatCard
            label="Zaległe zadania"
            value="-"
            description="Zaległe zadania w tym projekcie"
            icon={<SquareCheckBigIcon size={19} />}
            isLoading={isLoading}
          />
          <StatCard
            label="Zadania na dziś"
            value={"-"}
            description="Zadania na dziś w tym projekcie"
            icon={<SquareCheckBigIcon size={19} />}
            isLoading={isLoading}
          />
          <StatCard
            label="Ukończone w tym tygodniu"
            value={"-"}
            description="Zadania z tego projektu ukończone w tym tygodniu"
            icon={<SquareCheckBigIcon size={19} />}
            isLoading={isLoading}
          />
        </div>
      )}
    </ModulePage>
  );
};
