import type { Task } from "../../data/project/Task";

export interface MonthOption {
  id: number;
  name: string;
}

export interface DayItem {
  dayNumber: number;
  date: Date;
  dayOfWeek: number;
  dayOfWeekName: string;
  isWeekend: boolean;
  formattedDate: string;
}

export interface MonthData {
  monthId: number;
  year: number;
  totalDays: number;
  days: DayItem[];
}

export type CalendarTasksByDate = Record<string, Task[]>;
