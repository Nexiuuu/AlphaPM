import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AnalyticsChartPoint, ChartMouseEvent } from "../types";

interface AnalyticsLineChartProps {
  data: AnalyticsChartPoint[];
  activityLabel: string;
  refAreaLeft: string;
  refAreaRight: string;
  onMouseDown: (event: ChartMouseEvent) => void;
  onMouseMove: (event: ChartMouseEvent) => void;
  onMouseUp: () => void;
}

export const AnalyticsLineChart = ({
  data,
  activityLabel,
  refAreaLeft,
  refAreaRight,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: AnalyticsLineChartProps) => (
  <div className="h-[22rem] w-full min-w-0 select-none outline-none focus:outline-none [&_*]:outline-none sm:h-[26rem] md:h-[32rem]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <CartesianGrid
          stroke="var(--color-border)"
        />
        <XAxis dataKey="name" stroke="var(--color-text-disabled)" tick={false} />
        <YAxis
          stroke="var(--color-text-disabled)"
          domain={["auto", "auto"]}
          tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-text)",
            boxShadow: "var(--shadow-md)",
          }}
          labelStyle={{ color: "var(--color-text-muted)" }}
          itemStyle={{ color: "var(--color-primary)" }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          name={activityLabel}
          stroke="var(--color-primary)"
          strokeWidth={2}
          dot={(props) => {
            const { cx, cy, index } = props;
            if (index % 5 === 0) {
              return (
                <circle
                  key={`dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={3.5}
                  fill="var(--color-primary)"
                  stroke="var(--color-surface)"
                  strokeWidth={1.5}
                />
              );
            }
            return null;
          }}
        />
        {refAreaLeft && refAreaRight && (
          <ReferenceArea
            x1={refAreaLeft}
            x2={refAreaRight}
            strokeOpacity={0.3}
            fill="var(--color-primary)"
            fillOpacity={0.16}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  </div>
);
