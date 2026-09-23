import { CalendarDays, Clock, X } from "lucide-react";
import { useEffect } from "react";

import type { Task } from "../../../data/project/Task";
import type { DayItem } from "../types";

interface DayDetailsModalProps {
  day: DayItem | null;
  tasks: Task[];
  onClose: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("pl-PL", {
  hour: "2-digit",
  minute: "2-digit",
});

const getTaskTime = (task: Task) => {
  if (task.allday) return "Cały dzień";

  return `${timeFormatter.format(new Date(task.starts))}–${timeFormatter.format(new Date(task.deadline))}`;
};

export const DayDetailsModal = ({
  day,
  tasks,
  onClose,
}: DayDetailsModalProps) => {
  useEffect(() => {
    if (!day) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [day, onClose]);

  if (!day) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-2 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="day-details-title"
        className="max-h-[calc(100dvh-1rem)] w-full max-w-md overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] p-4 sm:gap-4 sm:p-5">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-primary)]">
              <CalendarDays size={15} /> Szczegóły dnia
            </p>
            <h3
              id="day-details-title"
              className="mt-2 text-lg font-semibold capitalize text-[var(--color-text)] sm:text-xl"
            >
              {dateFormatter.format(day.date)}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij szczegóły dnia"
            className="cursor-pointer rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            <X size={18} />
          </button>
        </header>

        <div className="max-h-[60dvh] overflow-y-auto p-4 sm:p-5">
          {tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--color-border)] px-5 py-8 text-center">
              <p className="font-medium text-[var(--color-text)]">
                Spokojny dzień
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Nie ma jeszcze żadnych zadań dla tej daty.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/40 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: task.color }}
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-[var(--color-text)]">
                        {task.name}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                        <Clock size={14} />
                        {getTaskTime(task)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};
