import { CalendarDays, Clock, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import type { Task } from "../../../data/task/Task";
import type { DayItem } from "../types";
import { useAuth } from "../../auth/useAuth";
import { useTranslation } from "react-i18next";

interface DayDetailsModalProps {
  day: DayItem | null;
  tasks: Task[];
  onClose: () => void;
}



export const DayDetailsModal = ({
  day,
  tasks,
  onClose,
}: DayDetailsModalProps) => {


  const { session } = useAuth();


  const { t, i18n } = useTranslation(["calendar", "common"]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [i18n.language]
  );

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [i18n.language]
  );

  useEffect(() => {
    if (!day) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [day, onClose]);

  if (!day) return null;

  const getTaskTime = (task: Task) => {
    if (task.allDay) return t("dayDetailsModal.allDay");

    return `${timeFormatter.format(new Date(task.startsAt))}–${timeFormatter.format(new Date(task.endsAt))}`;
  };

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
              <CalendarDays size={15} /> {t("dayDetailsModal.dayDetails")}
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
            aria-label={t("dayDetailsModal.closeDetails")}
            className="
              cursor-pointer 
              rounded-lg 
              p-2 
              text-[var(--color-text-muted)] 
              transition-colors 
              hover:bg-[var(--color-surface-hover)] 
              hover:text-[var(--color-text)] 
              focus:outline-none 
              focus-visible:ring-2 
              focus-visible:ring-[var(--color-primary)]
            "
          >
            <X size={18} />
          </button>
        </header>

        <div className="max-h-[60dvh] overflow-y-auto p-4 sm:p-5">
          {!session ? (
            <div className="rounded-xl border border-dashed border-[var(--color-border)] px-5 py-8 text-center">
              <p className="font-medium text-[var(--color-text)]">
                {t("common:guest.taskDayDetail")}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {t("common:guest.taskLoginAssigned")}
              </p>
              <Link
                to="/login"
                className="
                  mt-4 
                  inline-flex 
                  rounded-lg 
                  bg-[var(--color-primary)] 
                  px-4 
                  py-2 
                  text-sm 
                  font-medium 
                  text-[var(--color-primary-foreground)] 
                  transition-colors 
                  hover:bg-[var(--color-primary-hover)] 
                  focus:outline-none 
                  focus-visible:ring-2 
                  focus-visible:ring-[var(--color-primary)] 
                  focus-visible:ring-offset-2
                "
              >
                {t("common:guest.taskLogin")}
              </Link>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--color-border)] px-5 py-8 text-center">
              <p className="font-medium text-[var(--color-text)]">
                {t("dayDetailsModal.peacefulDay")}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {t("dayDetailsModal.noTasks")}
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
