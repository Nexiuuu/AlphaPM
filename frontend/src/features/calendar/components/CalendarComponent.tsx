import { useCallback, useMemo, useState } from "react";

import type { Task } from "../../../data/task/Task";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { DayDetailsModal } from "./DayDetailsModal";
import type { DayItem } from "../types";
import { groupTasksByDate } from "../utils";
import { CreateTaskPopup } from "../../task/components/CreateTaskPopup";

interface CalendarProps {
  tasks: Task[];
  selectedDay?: DayItem | null;
  onSelectedDayChange?: (day: DayItem | null) => void;
}

export const CalendarComponent = ({
  tasks,
  selectedDay,
  onSelectedDayChange,
}: CalendarProps) => {
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [createTaskPopupVisible, setCreateTaskPopupVisible] = useState(false);
  const [dayDetailsVisible, setDayDetailsVisible] = useState(false);

  const [internalSelectedDay, setInternalSelectedDay] =
    useState<DayItem | null>(null);

  const isControlled = selectedDay !== undefined;
  const activeSelectedDay = isControlled ? selectedDay : internalSelectedDay;

  const getDefaultDay = useCallback((targetMonth: Date) => {
    const today = new Date();

    const isCurrentMonth =
      targetMonth.getFullYear() === today.getFullYear() &&
      targetMonth.getMonth() === today.getMonth();

    const date = isCurrentMonth
      ? today
      : new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);

    return {
      date,
      dayNumber: date.getDate(),
      dayOfWeek: date.getDay(),
      dayOfWeekName: new Intl.DateTimeFormat("pl-PL", {
        weekday: "long",
      }).format(date),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      formattedDate: [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-"),
    };
  }, []);

  const changeSelectedDay = useCallback(
    (day: DayItem | null) => {
      if (!isControlled) {
        setInternalSelectedDay(day);
      }

      onSelectedDayChange?.(day);
    },
    [isControlled, onSelectedDayChange],
  );

  const currentYear = visibleMonth.getFullYear();
  const currentMonthId = visibleMonth.getMonth();

  const tasksByDate = useMemo(() => groupTasksByDate(tasks), [tasks]);

  const handleDayClick = useCallback(
    (day: DayItem) => {
      changeSelectedDay(day);
      setDayDetailsVisible(true);
    },
    [changeSelectedDay],
  );

  const showPreviousMonth = () => {
    const targetMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() - 1,
      1,
    );

    setVisibleMonth(targetMonth);
    changeSelectedDay(getDefaultDay(targetMonth));
    setDayDetailsVisible(false);
  };

  const showNextMonth = () => {
    const targetMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      1,
    );

    setVisibleMonth(targetMonth);
    changeSelectedDay(getDefaultDay(targetMonth));
    setDayDetailsVisible(false);
  };

  const showToday = () => {
    const today = new Date();
    const targetMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    setVisibleMonth(targetMonth);
    changeSelectedDay(getDefaultDay(targetMonth));
    setDayDetailsVisible(false);
  };

  const closeDayDetails = () => {
    setDayDetailsVisible(false);
  };

  const handleAddTask = useCallback(() => {
    setDayDetailsVisible(false);
    setCreateTaskPopupVisible(true);
  }, []);

  return (
    <>
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
          selectedDate={activeSelectedDay?.formattedDate}
          tasksByDate={tasksByDate}
          onDayClick={handleDayClick}
        />
      </div>

      {dayDetailsVisible && (
        <DayDetailsModal
          day={activeSelectedDay ?? null}
          tasks={
            activeSelectedDay
              ? (tasksByDate[activeSelectedDay.formattedDate] ?? [])
              : []
          }
          onClose={closeDayDetails}
          onAddTask={handleAddTask}
        />
      )}

      {createTaskPopupVisible && (
        <CreateTaskPopup
          day={activeSelectedDay}
          onClose={() => setCreateTaskPopupVisible(false)}
        />
      )}
    </>
  );
};
