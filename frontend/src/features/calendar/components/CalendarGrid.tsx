import { useMemo } from "react";

import type { CalendarTasksByDate, DayItem } from "../types";
import {
  formatDateString,
  generateMonthData,
  getFirstDayOfMonthOffset,
} from "../utils";
import { CalendarDay } from "./CalendarDay";

interface CalendarGridProps {
  year: number;
  monthId: number;
  selectedDate?: string;
  tasksByDate?: CalendarTasksByDate;
  onDayClick?: (day: DayItem) => void;
}

const WEEK_DAYS = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

export const CalendarGrid = ({
  year,
  monthId,
  selectedDate,
  tasksByDate = {},
  onDayClick,
}: CalendarGridProps) => {
  const monthData = useMemo(
    () => generateMonthData(year, monthId),
    [year, monthId],
  );
  const offset = useMemo(
    () => getFirstDayOfMonthOffset(year, monthId),
    [year, monthId],
  );
  const todayString = useMemo(() => formatDateString(new Date()), []);
  const usedCells = offset + monthData.totalDays;
  const trailingCells = Math.ceil(usedCells / 7) * 7 - usedCells;

  return (
    <div>
      <div className="grid grid-cols-7 border-b border-[var(--color-border)] bg-[var(--color-surface-hover)]/60">
        {WEEK_DAYS.map((dayName) => (
          <div
            key={dayName}
            className="py-2 text-center text-[10px] font-semibold uppercase text-[var(--color-text-muted)] sm:py-3 sm:text-xs sm:tracking-wider"
          >
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-[var(--color-border)]">
        {Array.from({ length: offset }).map((_, index) => (
          <div
            key={`empty-start-${index}`}
            className="min-h-16 bg-[var(--color-background)]/45 sm:min-h-24"
          />
        ))}

        {monthData.days.map((day) => (
          <CalendarDay
            key={day.formattedDate}
            day={day}
            isToday={day.formattedDate === todayString}
            isSelected={day.formattedDate === selectedDate}
            tasks={tasksByDate[day.formattedDate]}
            onClick={onDayClick}
          />
        ))}

        {Array.from({ length: trailingCells }).map((_, index) => (
          <div
            key={`empty-end-${index}`}
            className="min-h-16 bg-[var(--color-background)]/45 sm:min-h-24"
          />
        ))}
      </div>
    </div>
  );
};
