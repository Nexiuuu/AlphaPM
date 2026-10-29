import { FolderKanban, SquareCheckBigIcon } from "lucide-react";
import { useProjectTasks } from "../../../hooks/useProject";
import { ModulePage } from "../../ModulePage";
import { ProjectProvider } from "../../../features/project/ProjectProvider";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../NotFoundPage";
import { StatCard } from "../../../features/dashboard/DashboardStats/StatCard";
import { useTranslation } from "react-i18next";
import { CalendarComponent } from "../../../features/calendar/components/CalendarComponent";

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
  const { tasks, isAuthenticated, isLoading, error } = useProjectTasks();

  const { t } = useTranslation("project");

  if (!isAuthenticated) return <></>; // temp sollution TODO: print that: "you have to log in to see project panel"

  return error ? (
    <NotFoundPage />
  ) : (
    <ModulePage
      icon={FolderKanban}
      eyebrow={t("workspace")}
      title={t("title")}
      description={t("description")}
      emptyTitle={t("emptyTitle")}
      emptyDescription={t("emptyDescription")}
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard
          label={t("activeTasks.label")}
          value={tasks.length}
          description={t("activeTasks.description")}
          icon={<SquareCheckBigIcon size={19} />}
          isLoading={isLoading}
        />
        <StatCard
          label={t("overdueTasks.label")}
          value={"-"}
          description={t("overdueTasks.description")}
          icon={<SquareCheckBigIcon size={19} />}
          isLoading={isLoading}
        />
        <StatCard
          label={t("todaysTasks.label")}
          value={"-"}
          description={t("todaysTasks.description")}
          icon={<SquareCheckBigIcon size={19} />}
          isLoading={isLoading}
        />
        <StatCard
          label={t("completedThisWeek.label")}
          value={"-"}
          description={t("completedThisWeek.description")}
          icon={<SquareCheckBigIcon size={19} />}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-4">
        <CalendarComponent tasks={tasks} />
      </div>
    </ModulePage>
  );
};
