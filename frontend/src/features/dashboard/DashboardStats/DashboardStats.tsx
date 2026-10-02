import { CheckCircle2, FolderKanban, ListTodo, TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

import { StatCard } from "./StatCard";

interface DashboardStatsProps {
  projectsCount: number | null;
  isLoading: boolean;
}

export const DashboardStats = ({ projectsCount, isLoading }: DashboardStatsProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label={t("stats.activeProjects")}
        value={projectsCount ?? "-"}
        description={
          projectsCount === null
            ? t("stats.hiddenData")
            : t("stats.workspacesCount")
        }
        icon={<FolderKanban size={19} />}
        isLoading={isLoading}
      />
      <StatCard
        label={t("stats.tasksForToday")}
        value="-"
        description={t("stats.inPreparation")}
        icon={<ListTodo size={19} />}
        isLoading={isLoading}
      />
      <StatCard
        label={t("stats.overdueTasks")}
        value="-"
        description={t("stats.inPreparation")}
        icon={<TriangleAlert size={19} />}
        isLoading={isLoading}
      />
      <StatCard
        label={t("stats.completedThisWeek")}
        value="-"
        description={t("stats.inPreparation")}
        icon={<CheckCircle2 size={19} />}
        isLoading={isLoading}
      />
    </div>
  );
};