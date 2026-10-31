import type { AnalyticsChartPoint, AnalyticsDataPoint } from "./types";

export const generateAnalyticsData = (): AnalyticsDataPoint[] =>
  Array.from({ length: 365 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (364 - index));

    const day = index + 1;
    const base = 2500 + Math.sin(day / 50) * 400 - Math.cos(day / 30) * 200;
    const dipEffect =
      day >= 170 && day <= 220
        ? -350 * Math.sin(((day - 170) / 50) * Math.PI)
        : 0;
    const value = Math.round(base + dipEffect + (Math.random() * 40 - 20));

    return { date, uv: Math.max(value, 500) };
  });

export const aggregateByWeek = (
  points: AnalyticsChartPoint[],
): AnalyticsChartPoint[] => {
  const weeks = new Map<number, AnalyticsChartPoint[]>();

  points.forEach((point) => {
    const weekStart = new Date(point.date);
    weekStart.setHours(0, 0, 0, 0);
    const dayOfWeek = weekStart.getDay() || 7;
    weekStart.setDate(weekStart.getDate() - dayOfWeek + 1);

    const weekKey = weekStart.getTime();
    const weekPoints = weeks.get(weekKey) ?? [];
    weekPoints.push(point);
    weeks.set(weekKey, weekPoints);
  });

  return Array.from(weeks.values(), (weekPoints) => {
    const firstPoint = weekPoints[0];
    const lastPoint = weekPoints[weekPoints.length - 1];
    const average =
      weekPoints.reduce((sum, point) => sum + point.uv, 0) / weekPoints.length;

    return {
      ...firstPoint,
      name: `${firstPoint.name} – ${lastPoint.name}`,
      uv: Math.round(average),
      endIndex: lastPoint.endIndex,
    };
  });
};

export const addMonths = (date: Date, months: number) => {
  const result = new Date(date);
  const originalDay = result.getDate();

  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDayOfTargetMonth = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();
  result.setDate(Math.min(originalDay, lastDayOfTargetMonth));

  return result;
};

export const getCurrentMonthStartIndex = (data: AnalyticsDataPoint[]) => {
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  const firstIndex = data.findIndex((item) => item.date >= firstDayOfMonth);
  return firstIndex === -1 ? Math.max(data.length - 1, 0) : firstIndex;
};
