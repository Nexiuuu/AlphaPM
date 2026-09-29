import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useWorkspaces } from "../../features/workspaces/useWorkspaces";
import { WorkspaceColorPicker } from "../../features/workspaces/components/WorkspaceColorPicker";
import { Typebar } from "../../components/ui/typebar/Typebar";

interface ProjectForm {
  name: string;
  color: string;
}

export const CreateProjectForm = () => {
  const [createError, setCreateError] = useState<string | null>(null);
  const { createWorkspace } = useWorkspaces();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({
    defaultValues: {
      name: "",
      color: "#27f580",
    },
  });
  const selectedColor = useWatch({ control, name: "color" });

  const onSubmit = handleSubmit(async (values) => {
    setCreateError(null);

    try {
      const workspace = await createWorkspace(values);
      navigate(`/projects/${workspace.id}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nie udało się utworzyć projektu.";

      setCreateError(message);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="
                mb-2
                rounded-xl
                border
                border-[var(--color-border)]
                bg-[var(--color-background)]
                p-6
              "
    >
      <Typebar
        autoFocus
        id="project-name"
        variant="form"
        label="Nazwa projektu"
        placeholder=" "
        {...register("name", {
          required: "Podaj nazwę",
          minLength: {
            value: 2,
            message: "Minimum 2 znaki",
          },
          maxLength: 60,
        })}
      />

      {errors.name && (
        <p className="mt-1 text-xs text-[var(--color-danger)]">
          {errors.name.message}
        </p>
      )}

      {createError && (
        <p className="mt-1 text-xs text-[var(--color-danger)]">{createError}</p>
      )}

      <div className="mt-6">
        <p className="text-sm font-medium">
          Kolor projektu
        </p>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Kolor pomoże Ci szybko rozpoznać projekt w sidebarze.
        </p>

        <div className="mt-3">
          <WorkspaceColorPicker
            id="project-color"
            color={selectedColor}
            description="Kliknij próbkę, aby wybrać kolor"
            registration={register("color")}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Link
          to={"/projects"}
          className="
                        px-2.5
                        py-1.5
                        rounded-lg
                        bg-transparent
                        border-1
                        border-[var(--color-primary)]
                        cursor-pointer
                        text-xs
                        font-semibold
                        text-[var(--color-primary)]
                        hover:border-[var(--color-primary-hover)]
                        hover:text-[var(--color-primary-hover)]
                        focus:outline-none
                    "
        >
          Anuluj
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
                        cursor-pointer
                        rounded-lg
                        bg-[var(--color-primary)]
                        px-2.5
                        py-1.5
                        text-xs
                        font-semibold
                        text-[var(--color-primary-foreground)]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        focus:outline-none
                    "
        >
          {isSubmitting ? "Tworzę…" : "Utwórz projekt"}
        </button>
      </div>
    </form>
  );
};
