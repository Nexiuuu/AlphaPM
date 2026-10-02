import { FolderKanban, SquareCheckBigIcon } from "lucide-react";
import { useProjectTasks } from "../../../hooks/useProject";
import { ModulePage } from "../../ModulePage";
import { ProjectProvider } from "../../../features/project/ProjectProvider";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../NotFoundPage";
import { StatCard } from "../../../features/dashboard/DashboardStats/StatCard";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("project");

  return (
    <ModulePage
      icon={FolderKanban}
      eyebrow={t("workspace")}
      title={t("title")}
      description={t("description")}
      emptyTitle={t("emptyTitle")}
      emptyDescription={t("emptyDescription")}
    >
      {error ? (
        <p className="mt-4 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 px-4 py-3 text-sm">
          {t("errors.retrieve")}: {error}
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
