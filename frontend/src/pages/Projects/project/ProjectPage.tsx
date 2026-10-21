import { FolderKanban, SquareCheckBigIcon } from "lucide-react";
import { useProjectTasks } from "../../../hooks/useProject";
import { ModulePage } from "../../ModulePage";
import { ProjectProvider } from "../../../features/project/ProjectProvider";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../NotFoundPage";
import { StatCard } from "../../../features/dashboard/DashboardStats/StatCard";
import { useTranslation } from "react-i18next";
import { CalendarHeader } from "../../../features/calendar/components/CalendarHeader";
import { useCallback, useMemo, useState } from "react";
import type { DayItem } from "../../../features/calendar/types";
import { groupTasksByDate } from "../../../features/calendar/utils";
import { CalendarGrid } from "../../../features/calendar/components/CalendarGrid";
import { DayDetailsModal } from "../../../features/calendar/components/DayDetailsModal";

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

  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState<DayItem | null>(null);

  const currentYear = visibleMonth.getFullYear();
  const currentMonthId = visibleMonth.getMonth();
  const tasksByDate = useMemo(() => groupTasksByDate(tasks), [tasks]);

  const showPreviousMonth = () => {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
    setSelectedDay(null);
  };

  const showNextMonth = () => {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
    setSelectedDay(null);
  };

  const showToday = () => {
    const today = new Date();
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(null);
  };

  const closeDayDetails = useCallback(() => setSelectedDay(null), []);
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

      <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] sm:rounded-2xl">
        <CalendarHeader
          year={currentYear}
          monthId={currentMonthId}
          onPreviousMonth={showPreviousMonth}
          onNextMonth={showNextMonth}
          onToday={showToday}
        />

        <CalendarGrid
          year={currentYear}
          monthId={currentMonthId}
          selectedDate={selectedDay?.formattedDate}
          tasksByDate={tasksByDate}
          onDayClick={setSelectedDay}
        />
      </div>

      <DayDetailsModal
        day={selectedDay}
        tasks={
          selectedDay ? (tasksByDate[selectedDay.formattedDate] ?? []) : []
        }
        onClose={closeDayDetails}
      />
    </ModulePage>
  );
};
