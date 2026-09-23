import { CalendarDays } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import type { Task } from "../data/project/Task";
import { CalendarGrid } from "../features/calendar/components/CalendarGrid";
import { CalendarHeader } from "../features/calendar/components/CalendarHeader";
import { DayDetailsModal } from "../features/calendar/components/DayDetailsModal";
import type { DayItem } from "../features/calendar/types";
import { groupTasksByDate } from "../features/calendar/utils";
import { ModulePage } from "./ModulePage";

const tasks: Task[] = [];

export const CalendarPage = () => {
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState<DayItem | null>(null);

  const currentYear = visibleMonth.getFullYear();
  const currentMonthId = visibleMonth.getMonth();
  const tasksByDate = useMemo(() => groupTasksByDate(tasks), []);

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

  return (
    <ModulePage
      icon={CalendarDays}
      eyebrow="Terminy"
      title="Kalendarz"
      description="Zbierz ważne daty i plan pracy w jednym miejscu."
      emptyTitle="Nie masz jeszcze terminów"
      emptyDescription="Terminy z projektów i zadań pojawią się tutaj, gdy moduł zadań będzie gotowy."
    >
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] sm:rounded-2xl">
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
        tasks={selectedDay ? tasksByDate[selectedDay.formattedDate] ?? [] : []}
        onClose={closeDayDetails}
      />
    </ModulePage>
  );
};
