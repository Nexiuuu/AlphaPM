import type { AnalyticsRange, AnalyticsRangeOption } from "../types";

interface AnalyticsRangeControlsProps {
  period: string;
  changeText: string;
  isChangePositive: boolean;
  activeRange: AnalyticsRange;
  showReset: boolean;
  labels: {
    activePeriod: string;
    valueChange: string;
    week: string;
    month: string;
    year: string;
    reset: string;
  };
  onRangeSelect: (range: AnalyticsRangeOption) => void;
  onReset: () => void;
}

const rangeOptions: AnalyticsRangeOption[] = ["week", "month", "year"];

export const AnalyticsRangeControls = ({
  period,
  changeText,
  isChangePositive,
  activeRange,
  showReset,
  labels,
  onRangeSelect,
  onReset,
}: AnalyticsRangeControlsProps) => (
  <div className="
    flex 
    flex-col 
    flex-wrap 
    items-start 
    justify-between 
    gap-4 
    rounded-[var(--radius-md)] 
    border 
    border-[var(--color-border)] 
    bg-[var(--color-surface)] 
    p-4 
    text-[var(--color-text)] 
    shadow-[var(--shadow-sm)] 
    sm:flex-row 
    sm:items-center 
    sm:p-5
    "
  >
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      <div>
        <span className="mb-1 block text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          {labels.activePeriod}
        </span>
        <span className="text-sm font-semibold">{period}</span>
      </div>
      <div>
        <span className="mb-1 block text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          {labels.valueChange}
        </span>
        <span
          className={`text-sm font-bold ${isChangePositive
              ? "text-[var(--color-success)]"
              : "text-[var(--color-danger)]"
            }`}
        >
          {changeText}
        </span>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-1">
        {rangeOptions.map((range) => (
          <button
            key={range}
            onClick={() => onRangeSelect(range)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${activeRange === range
                ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
              }`}
          >
            {labels[range]}
          </button>
        ))}
      </div>

      {showReset && (
        <button
          onClick={onReset}
          className="
            rounded-lg 
            border 
            border-[var(--color-border)] 
            bg-[var(--color-surface)] 
            px-3 
            py-1.5 
            text-xs 
            text-[var(--color-primary)] 
            transition-colors 
            hover:bg-[var(--color-surface-hover)]
          "
        >
          {labels.reset}
        </button>
      )}
    </div>
  </div>
);
