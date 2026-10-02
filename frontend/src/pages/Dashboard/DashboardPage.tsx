import { CalendarDays, ListTodo } from "lucide-react";

import { useWorkspaces } from "../../features/workspaces/useWorkspaces";
import { DashboardHeader } from "../../features/dashboard/DashboardContent/DashboardHeader";
import { DashboardPlaceholder } from "../../features/dashboard/DashboardContent/DashboardPlaceholder";
import { RecentProjects } from "../../features/dashboard/DashboardContent/RecentProjects";
import { DashboardStats } from "../../features/dashboard/DashboardStats/DashboardStats";
import { AuthenticatedContent } from "../../features/auth/components/AuthenticatedContent";
import { GuestPreviewMessage } from "../../features/auth/components/GuestPreviewMessage";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {
  const { workspaces, isLoading, error } = useWorkspaces();
  const { t } = useTranslation(["dashboard", "common"]);

  return (
    <section className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <DashboardHeader />

      <AuthenticatedContent
        fallback={<DashboardStats projectsCount={null} isLoading={false} />}
      >
        <DashboardStats
          projectsCount={workspaces.length}
          isLoading={isLoading}
        />
      </AuthenticatedContent>

      <AuthenticatedContent>
        {error && (
          <p className="mt-4 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 px-4 py-3 text-sm">
            {t("common:projectsError")} {error}
          </p>
        )}
      </AuthenticatedContent>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
        <RecentProjects workspaces={workspaces} isLoading={isLoading} />

        <AuthenticatedContent
          fallback={
            <GuestPreviewMessage
              title={t("common:guest.tasks")}
              description={t("common:guest.priorities")}
            />
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <DashboardPlaceholder
              icon={<ListTodo size={19} />}
              label={t("priorities.badge")}
              title={t("priorities.title")}
              description={t("priorities.description")}
              linkLabel={t("priorities.goToTasks")}
              to="/tasks"
            />

            <DashboardPlaceholder
              icon={<CalendarDays size={19} />}
              label={t("deadlines.badge")}
              title={t("deadlines.title")}
              description={t("deadlines.description")}
              linkLabel={t("deadlines.openCalendar")}
              to="/calendar"
            />
          </div>
        </AuthenticatedContent>
      </div>
    </section>
  );
};
