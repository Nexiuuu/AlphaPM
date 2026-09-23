import { ChevronLeft, ChevronRight } from "lucide-react";

import { MONTHS } from "../utils";

interface CalendarHeaderProps {
  year: number;
  monthId: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader = ({
  year,
  monthId,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--color-border)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4 sm:px-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
          Wyświetlany miesiąc
        </p>
        <h3 className="mt-1 text-xl font-semibold text-[var(--color-text)]">
          {MONTHS[monthId].name} {year}
        </h3>
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-start">
        <button
          type="button"
          onClick={onToday}
          className="cursor-pointer rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          Dzisiaj
        </button>

        <button
          type="button"
          onClick={onPreviousMonth}
          aria-label="Poprzedni miesiąc"
          className="cursor-pointer rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={onNextMonth}
          aria-label="Następny miesiąc"
          className="cursor-pointer rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
