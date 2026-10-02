import i18next from "i18next";
import type { Task } from "../../data/task/Task";
import type {
  CalendarTasksByDate,
  DayItem,
  MonthData,
  MonthOption,
} from "./types";

export const MONTHS: MonthOption[] = [
  { id: 0, name: "Styczeń" },
  { id: 1, name: "Luty" },
  { id: 2, name: "Marzec" },
  { id: 3, name: "Kwiecień" },
  { id: 4, name: "Maj" },
  { id: 5, name: "Czerwiec" },
  { id: 6, name: "Lipiec" },
  { id: 7, name: "Sierpień" },
  { id: 8, name: "Wrzesień" },
  { id: 9, name: "Październik" },
  { id: 10, name: "Listopad" },
  { id: 11, name: "Grudzień" },
];

export const getMonths = (locale = i18next.language): MonthOption[] => {
  const formatter = new Intl.DateTimeFormat(locale, { month: "long" });

  return Array.from({ length: 12 }, (_, monthId) => {
    const date = new Date(2026, monthId, 1);
    const rawName = formatter.format(date);

    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    return { id: monthId, name };
  });
};

export const getDaysNames = (locale = i18next.language): string[] => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });

  return Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(2026, 9, 4 + dayIndex);
    return formatter.format(date);
  });
};

export const getDaysInMonthCount = (year: number, monthId: number): number =>
  new Date(year, monthId + 1, 0).getDate();

export const getFirstDayOfMonthOffset = (
  year: number,
  monthId: number,
): number => {
  const jsDay = new Date(year, monthId, 1).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
};

export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const generateMonthData = (
  year: number,
  monthId: number,
  locale = i18next.language,
): MonthData => {
  const totalDays = getDaysInMonthCount(year, monthId);
  const dayNames = getDaysNames(locale);
  const days: DayItem[] = [];

  for (let dayNumber = 1; dayNumber <= totalDays; dayNumber++) {
    const date = new Date(year, monthId, dayNumber);
    const dayOfWeek = date.getDay();

    days.push({
      dayNumber,
      date,
      dayOfWeek,
      dayOfWeekName: dayNames[dayOfWeek],
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      formattedDate: formatDateString(date),
    });
  }

  return { monthId, year, totalDays, days };
};

export const groupTasksByDate = (tasks: Task[]): CalendarTasksByDate => {
  return tasks.reduce<CalendarTasksByDate>((tasksByDate, task) => {
    const starts = new Date(task.startsAt);
    const endsAt = new Date(task.endsAt);

    const firstDate = starts <= endsAt ? starts : endsAt;
    const lastDate = starts <= endsAt ? endsAt : starts;
    const currentDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate(),
    );
    const finalDate = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate(),
    );

    while (currentDate <= finalDate) {
      const dateKey = formatDateString(currentDate);
      tasksByDate[dateKey] = [...(tasksByDate[dateKey] ?? []), task];
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return tasksByDate;
  }, {});
};
