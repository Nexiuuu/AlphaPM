export type AnalyticsRange = "week" | "month" | "year" | null;
export type AnalyticsRangeOption = Exclude<AnalyticsRange, null>;

export interface AnalyticsDataPoint {
  date: Date;
  uv: number;
}

export interface AnalyticsChartPoint extends AnalyticsDataPoint {
  name: string;
  startIndex: number;
  endIndex: number;
}

export interface ChartMouseEvent {
  activeLabel?: string | number;
}
