import { useEffect, type PropsWithChildren } from "react";
import { Controller, useForm } from "react-hook-form";

import type { CreateTaskInput } from "../../../data/task/Task";
import type { DayItem } from "../../calendar/types";
import { useIsProjectTasksUsed } from "../../../hooks/useProject";
import { useWorkspaces } from "../../workspaces/useWorkspaces";
import { ProjectProvider } from "../../project/ProjectProvider";
import { Button } from "../../../components/ui/Button/Button";
import clsx from "clsx";
import { Typebar } from "../../../components/ui/typebar/Typebar";
import { WorkspaceColorPicker } from "../../workspaces/components/WorkspaceColorPicker";

interface CreateTaskPopupProps {
  day: DayItem | null;
  onClose: () => void;
}

export const CreateTaskPopup = ({ day, onClose }: CreateTaskPopupProps) => {
  const isProjectTasksUsed = useIsProjectTasksUsed();
  const { workspaces } = useWorkspaces();

  if (isProjectTasksUsed) {
    return (
      <Popup onClose={onClose}>
        <p className="text-md p-4 ml-2 mr-2 h-30 flex items-center justify-center text-center text-[var(--color-text)]">
          Jeszcze nie gotowe
        </p>
      </Popup>
    );
    return <CreateTaskPopupContent day={day} onClose={onClose} />;
  }

  if (workspaces.length > 0) {
    return (
      <Popup onClose={onClose}>
        <p className="text-md p-4 ml-2 mr-2 h-30 flex items-center justify-center text-center text-[var(--color-text)]">
          Jeszcze nie gotowe
        </p>
      </Popup>
    );
    return (
      <ProjectProvider id={workspaces[0].id}>
        <CreateTaskPopupContent day={day} onClose={onClose} />
      </ProjectProvider>
    );
  }

  return (
    <Popup onClose={onClose}>
      <p className="text-md p-6 ml-2 mr-2 h-40 flex items-center justify-center text-center text-[var(--color-text)]">
        Nie masz jeszcze żadnego projektu, w którym można utworzyć zadanie.
      </p>
    </Popup>
  );
};

const CreateTaskPopupContent = ({ day, onClose }: CreateTaskPopupProps) => {
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    defaultValues: {
      name: "",
      color: primaryColor,
      description: "",
      allDay: true,
    },
  });

  const onSubmit = (data: CreateTaskInput) => {
    const taskData: CreateTaskInput = {
      ...data,
      startsAt: day
        ? new Date(
            day.date.getFullYear(),
            day.date.getMonth(),
            day.date.getDate(),
          )
        : new Date(),
      endsAt: day
        ? new Date(
            day.date.getFullYear(),
            day.date.getMonth(),
            day.date.getDate(),
            23,
            59,
            0,
          )
        : new Date(),
    };

    console.log(taskData); // TODO: call api
  };

  return (
    <Popup onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
        <div>
          <h2
            id="create-task-title"
            className="text-lg font-semibold text-[var(--color-text)]"
          >
            Nowe zadanie
          </h2>

          {day && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {day.formattedDate}
            </p>
          )}
        </div>

        <div>
          <Typebar
            label="Nazwa zadania"
            variant="form-d"
            id="name"
            placeholder=" "
            {...register("name", {
              required: "Podaj nazwę zadania.",
              maxLength: {
                value: 200,
                message: "Nazwa może mieć maksymalnie 200 znaków.",
              },
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
            rules={{ required: true }}
            render={({ field }) => (
              <WorkspaceColorPicker
                id="color"
                value={field.value}
                onChange={field.onChange}
                description="Kolor zadania"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm">
            Opis
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-2"
            rows={4}
            placeholder="Opis zadania"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("allDay")} />
          Cały dzień
        </label>

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

const Popup = ({
  className: cn,
  children,
  onClose,
}: PropsWithChildren<{ className?: string; onClose: () => void }>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
        cn,
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
      >
        {children}
      </section>
    </div>
  );
};
