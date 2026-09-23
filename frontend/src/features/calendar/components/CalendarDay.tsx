import type { Task } from "../../../data/project/Task";
import type { DayItem } from "../types";

interface CalendarDayProps {
  day: DayItem;
  isToday: boolean;
  isSelected: boolean;
  tasks?: Task[];
  onClick?: (day: DayItem) => void;
}

export const CalendarDay = ({
  day,
  isToday,
  isSelected,
  tasks = [],
  onClick,
}: CalendarDayProps) => {
  const visibleTasks = tasks.slice(0, 3);
  const hiddenTasksCount = tasks.length - visibleTasks.length;

  return (
    <button
      type="button"
      onClick={() => onClick?.(day)}
      aria-label={`Otwórz ${day.formattedDate}${tasks.length ? `, liczba zadań: ${tasks.length}` : ""}`}
      className={`
        group
        flex
        min-h-16
        min-w-0
        w-full
        cursor-pointer
        flex-col
        items-start
        justify-between
        bg-[var(--color-surface)]
        p-1
        text-left
        transition-colors
        hover:bg-[var(--color-surface-hover)]
        focus:outline-none
        focus-visible:relative
        focus-visible:z-10
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-[var(--color-primary)]
        sm:min-h-24
        sm:p-2.5
        ${day.isWeekend ? "bg-[color-mix(in_srgb,var(--color-surface-hover)_45%,var(--color-surface))]" : ""}
        ${isSelected ? "relative z-10 ring-2 ring-inset ring-[var(--color-primary)]" : ""}
      `}
    >
      <span
        className={`
          flex
          h-6
          min-w-6
          items-center
          justify-center
          rounded-full
          px-1
          text-xs
          sm:h-7
          sm:min-w-7
          sm:px-1.5
          sm:text-sm
          ${
            isToday
              ? "bg-[var(--color-primary)] font-bold text-[var(--color-primary-foreground)]"
              : day.isWeekend
                ? "text-[var(--color-text-muted)]"
                : "text-[var(--color-text)]"
          }
        `}
      >
        {day.dayNumber}
      </span>

      <div
        className="flex min-h-2 max-w-full items-center gap-0.5 sm:min-h-3 sm:gap-1"
        aria-hidden="true"
      >
        {visibleTasks.map((task) => (
          <span
            key={task.id}
            className="h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2"
            style={{ backgroundColor: task.color }}
          />
        ))}

        {hiddenTasksCount > 0 && (
          <span className="text-[8px] text-[var(--color-text-muted)] sm:text-[10px]">
            +{hiddenTasksCount}
          </span>
        )}
      </div>
    </button>
  );
};
