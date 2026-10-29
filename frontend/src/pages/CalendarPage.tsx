import { CalendarDays } from "lucide-react";

import type { Task } from "../data/task/Task";
import { ModulePage } from "./ModulePage";
import { useTranslation } from "react-i18next";
import { CalendarComponent } from "../features/calendar/components/CalendarComponent";

const tasks: Task[] = [];

export const CalendarPage = () => {
  const { t } = useTranslation("calendar");

  return (
    <ModulePage
      icon={CalendarDays}
      eyebrow={t("deadlines")}
      title={t("pageTitle")}
      description={t("description")}
      emptyTitle={t("emptyTitle")}
      emptyDescription={t("emptyDescription")}
    >
      <CalendarComponent tasks={tasks} />
    </ModulePage>
  );
};
