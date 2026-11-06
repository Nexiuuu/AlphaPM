import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import type { CreateTaskInput } from "../../../data/task/Task";
import type { DayItem } from "../../calendar/types";
import {
  useOptionalProjectTasks,
  useProjectTasks,
} from "../../../hooks/useProject";
import { useWorkspaces } from "../../workspaces/useWorkspaces";
import { ProjectProvider } from "../../project/ProjectProvider";
import { Button } from "../../../components/ui/Button/Button";
import { Typebar } from "../../../components/ui/typebar/Typebar";
import { WorkspaceColorPicker } from "../../workspaces/components/WorkspaceColorPicker";
import type { Workspace } from "../../workspaces/types";
import { CalendarDays, Clock } from "lucide-react";
import { Selectbar } from "../../../components/ui/selectionbar/Selectionbar";
import { useTheme } from "../../../hooks/useTheme";
import { Popup } from "../../global/components/Popup";

interface CreateTaskPopupProps {
  day: DayItem | null;
  onClose: () => void;
}

interface CreateTaskPopupContentProps extends CreateTaskPopupProps {
  workspace: Workspace;
  workspaces?: Workspace[];
  onProjectChange?: (projectId: string) => void;
}

export const CreateTaskPopup = ({ day, onClose }: CreateTaskPopupProps) => {
  const projectTasks = useOptionalProjectTasks();
  const { workspaces } = useWorkspaces();
  const [pickedId, setPickedId] = useState<string | undefined>();

  if (projectTasks) {
    const current = workspaces.find((w) => w.id === projectTasks.projectId);

    if (!current)
      return (
        <Popup labeledBy="create-task-title" onClose={onClose}>
          <p className="text-md p-6 ml-2 mr-2 h-40 flex items-center justify-center text-center text-[var(--color-text)]">
            Nie odnaleziono projektu!
          </p>
        </Popup>
      );

    return (
      <CreateTaskPopupContent workspace={current} day={day} onClose={onClose} />
    );
  }

  if (workspaces.length > 0) {
    const selected = workspaces.find((w) => w.id === pickedId) ?? workspaces[0];

    return (
      <ProjectProvider id={selected.id}>
        <CreateTaskPopupContent
          workspace={selected}
          day={day}
          onClose={onClose}
          workspaces={workspaces}
          onProjectChange={setPickedId}
        />
      </ProjectProvider>
    );
  }

  return (
    <Popup labeledBy="create-task-title" onClose={onClose}>
      <p className="text-md p-6 ml-2 mr-2 h-40 flex items-center justify-center text-center text-[var(--color-text)]">
        Nie masz jeszcze żadnego projektu, w którym można utworzyć zadanie.
      </p>
    </Popup>
  );
};

// Helpers

const dateToInput = (date: Date): string => {
  if (isNaN(date.getTime())) return "";

  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
};

const timeToInput = (date: Date): string => {
  if (isNaN(date.getTime())) return "";

  const pad = (value: number) => String(value).padStart(2, "0");

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const setDate = (current: Date, value: string): Date => {
  if (!value) return new Date(NaN);

  const [year, month, day] = value.split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day,
    current.getHours(),
    current.getMinutes(),
  );
};

const setTime = (current: Date, value: string): Date => {
  if (!value) return new Date(NaN);

  const [hours, minutes] = value.split(":").map(Number);

  return new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    hours,
    minutes,
  );
};

const setDateTime = (date: Date, hours: number, minutes: number): Date => {
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
};

const CreateTaskPopupContent = ({
  workspace,
  day,
  onClose,
  workspaces,
  onProjectChange,
}: CreateTaskPopupContentProps) => {
  //TODO: Replace date inputs with own components (and textarea)
  const { createTask } = useProjectTasks();
  const { theme } = useTheme();
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim();

  const initialDate = day?.date ?? new Date();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CreateTaskInput, "projectId" | "visibleTo">>({
    defaultValues: {
      name: "",
      color: primaryColor,
      description: "",
      allDay: true,
      startsAt: setDateTime(initialDate, 0, 0),
      endsAt: setDateTime(initialDate, 23, 59),
    },
  });

  const allDay = useWatch({
    control,
    name: "allDay",
  });

  const onSubmit = async (
    data: Omit<CreateTaskInput, "projectId" | "visibleTo">,
  ) => {
    const taskData: CreateTaskInput = {
      ...data,
      projectId: workspace.id,
      visibleTo: "member",
      name: data.name.trim(),
      description: data.description?.trim(),
      startsAt: data.allDay ? setDateTime(data.startsAt, 0, 0) : data.startsAt,
      endsAt: data.allDay ? setDateTime(data.endsAt, 23, 59) : data.endsAt,
    };

    try {
      await createTask(taskData);
      onClose();
    } catch (error) {
      console.error("Nie udało się utworzyć zadania:", error);
    }
  };

  return (
    <Popup labeledBy="create-task-title" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
        <div>
          <h2
            id="create-task-title"
            className="text-lg font-semibold text-[var(--color-text)]"
          >
            Nowe zadanie
          </h2>
        </div>

        {workspaces && onProjectChange && (
          <div>
            <label
              htmlFor="project"
              className="select-none mb-1 block text-sm text-[var(--color-text)]"
            >
              Projekt
            </label>

            <Selectbar
              id="project"
              value={workspace.id}
              onChange={(e) => onProjectChange(e.target.value)}
              className="
                  w-full 
                  rounded-lg 
                  border border-[var(--color-border)] 
                  bg-[var(--color-background)] 
                  p-2 
                  text-[var(--color-text)]
                "
            >
              {workspaces.map((item) => (
                <option
                  className="bg-[var(--color-surface)] text-[var(--color-text)]"
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </Selectbar>
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="select-none mb-1 block text-sm text-[var(--color-text)]"
          >
            Nazwa zadania
          </label>
          <Typebar
            label="Nazwa zadania"
            variant="form-d"
            id="name"
            placeholder=" "
            {...register("name", {
              required: "Podaj nazwę zadania.",
              maxLength: {
                value: 60,
                message: "Nazwa może mieć maksymalnie 200 znaków.",
              },
              validate: (value) =>
                value.trim().length > 0 || "Nazwa zadania nie może być pusta.",
            })}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="pt-2 pb-2">
          <Controller
            name="color"
            control={control}
            rules={{ required: "Wybierz kolor zadania." }}
            render={({ field }) => (
              <WorkspaceColorPicker
                id="color"
                value={field.value}
                onChange={field.onChange}
                description="Kolor zadania"
              />
            )}
          />

          {errors.color && (
            <p className="mt-1 text-sm text-red-500">{errors.color.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="select-none mb-1 block text-sm text-[var(--color-text)]"
          >
            Opis
          </label>

          <textarea
            id="description"
            {...register("description")}
            className="
                w-full
                resize-y 
                rounded-lg 
                border border-[var(--color-border)] 
                bg-[var(--color-background)] 
                p-2 
                text-[var(--color-text)]
              "
            rows={4}
            placeholder="Opis zadania"
          />
        </div>

        <Controller
          name="allDay"
          control={control}
          render={({ field }) => (
            <label className="select-none flex w-fit items-center gap-2 text-sm text-[var(--color-text)]">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                className="accent-[var(--color-primary)]"
              />
              Cały dzień
            </label>
          )}
        />

        <div className="space-y-3">
          <div>
            <label className="select-none mb-1 block text-sm text-[var(--color-text)]">
              Rozpoczęcie
            </label>

            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="startsAt"
                control={control}
                rules={{
                  validate: (value) =>
                    (value instanceof Date && !isNaN(value.getTime())) ||
                    "Nieprawidłowa data rozpoczęcia.",
                }}
                render={({ field }) => (
                  <div className="relative w-full">
                    <input
                      type="date"
                      value={dateToInput(field.value)}
                      onChange={(e) =>
                        field.onChange(setDate(field.value, e.target.value))
                      }
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className={`
                        w-full min-w-0 
                        rounded-lg 
                        border border-[var(--color-border)] 
                        bg-[var(--color-background)] 
                        p-2 
                        text-sm text-[var(--color-text)] 
                        [&::-webkit-calendar-picker-indicator]:opacity-0
                        ${theme === "DARK" ? "scheme-dark" : "scheme-light"}
                      `}
                      style={{
                        accentColor: "var(--color-primary)",
                      }}
                    />
                    <CalendarDays
                      size={18}
                      className="
                          pointer-events-none
                          absolute right-3 top-1/2
                          -translate-y-1/2
                          text-[var(--color-primary)]
                        "
                    />
                  </div>
                )}
              />

              <div className={allDay ? "invisible" : "visible"}>
                <Controller
                  name="startsAt"
                  control={control}
                  rules={{
                    validate: (value) =>
                      (value instanceof Date && !isNaN(value.getTime())) ||
                      "Nieprawidłowa godzina rozpoczęcia.",
                  }}
                  render={({ field }) => (
                    <div className="relative w-full">
                      <input
                        type="time"
                        value={timeToInput(field.value)}
                        onChange={(e) =>
                          field.onChange(setTime(field.value, e.target.value))
                        }
                        onBlur={field.onBlur}
                        className={`
                            w-full min-w-0 
                            rounded-lg 
                            border border-[var(--color-border)] 
                            bg-[var(--color-background)] 
                            p-2 
                            text-sm text-[var(--color-text)]
                            [&::-webkit-calendar-picker-indicator]:opacity-0
                            ${theme === "DARK" ? "scheme-dark" : "scheme-light"}
                          `}
                        style={{
                          accentColor: "var(--color-primary)",
                        }}
                      />
                      <Clock
                        size={18}
                        className="
                          pointer-events-none
                          absolute right-3 top-1/2
                          -translate-y-1/2
                          text-[var(--color-primary)]
                        "
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            {errors.startsAt && (
              <p className="mt-1 text-sm text-red-500">
                {errors.startsAt.message}
              </p>
            )}
          </div>

          <div>
            <label className="select-none mb-1 block text-sm text-[var(--color-text)]">
              Zakończenie
            </label>

            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="endsAt"
                control={control}
                rules={{
                  validate: (value, formValues) => {
                    if (!(value instanceof Date) || isNaN(value.getTime()))
                      return "Nieprawidłowa data zakończenia.";

                    const startsAt = formValues.startsAt;

                    if (
                      !(startsAt instanceof Date) ||
                      isNaN(startsAt.getTime())
                    )
                      return "Nieprawidłowa data rozpoczęcia.";

                    const start = formValues.allDay
                      ? setDateTime(startsAt, 0, 0)
                      : startsAt;

                    const end = formValues.allDay
                      ? setDateTime(value, 23, 59)
                      : value;

                    return (
                      end.getTime() > start.getTime() ||
                      "Zakończenie musi być późniejsze od rozpoczęcia."
                    );
                  },
                }}
                render={({ field }) => (
                  <div className="relative w-full">
                    <input
                      type="date"
                      value={dateToInput(field.value)}
                      onChange={(e) =>
                        field.onChange(setDate(field.value, e.target.value))
                      }
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className={`
                          w-full min-w-0 
                          rounded-lg 
                          border border-[var(--color-border)] 
                          bg-[var(--color-background)] 
                          p-2 
                          text-sm text-[var(--color-text)]
                          [&::-webkit-calendar-picker-indicator]:opacity-0
                          ${theme === "DARK" ? "scheme-dark" : "scheme-light"}
                        `}
                      style={{
                        accentColor: "var(--color-primary)",
                      }}
                    />
                    <CalendarDays
                      size={18}
                      className="
                          pointer-events-none
                          absolute right-3 top-1/2
                          -translate-y-1/2
                          text-[var(--color-primary)]
                        "
                    />
                  </div>
                )}
              />

              <div className={allDay ? "invisible" : "visible"}>
                <Controller
                  name="endsAt"
                  control={control}
                  rules={{
                    validate: (value, formValues) => {
                      if (!(value instanceof Date) || isNaN(value.getTime()))
                        return "Nieprawidłowa godzina zakończenia.";

                      const startsAt = formValues.startsAt;

                      if (
                        !(startsAt instanceof Date) ||
                        isNaN(startsAt.getTime())
                      )
                        return "Nieprawidłowa godzina rozpoczęcia.";

                      return (
                        value.getTime() > startsAt.getTime() ||
                        "Zakończenie musi być późniejsze niż rozpoczęcie."
                      );
                    },
                  }}
                  render={({ field }) => (
                    <div className="relative w-full">
                      <input
                        type="time"
                        value={timeToInput(field.value)}
                        onChange={(e) =>
                          field.onChange(setTime(field.value, e.target.value))
                        }
                        onBlur={field.onBlur}
                        className={`
                          w-full min-w-0 
                          rounded-lg 
                          border border-[var(--color-border)] 
                          bg-[var(--color-background)] 
                          p-2 
                          text-sm text-[var(--color-text)]
                          [&::-webkit-calendar-picker-indicator]:opacity-0
                          ${theme === "DARK" ? "scheme-dark" : "scheme-light"}
                        `}
                        style={{
                          accentColor: "var(--color-primary)",
                        }}
                      />
                      <Clock
                        size={18}
                        className="
                          pointer-events-none
                          absolute right-3 top-1/2
                          -translate-y-1/2
                          text-[var(--color-primary)]
                        "
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            {errors.endsAt && (
              <p className="mt-1 text-sm text-red-500">
                {errors.endsAt.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Anuluj
          </Button>

          <Button variant="primary" type="submit">
            Utwórz zadanie
          </Button>
        </div>
      </form>
    </Popup>
  );
};
