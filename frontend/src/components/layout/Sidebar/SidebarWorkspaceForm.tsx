import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useWorkspaces } from "../../../features/workspaces/useWorkspaces";

interface SidebarWorkspaceFormProps {
  onClose: () => void;
}

interface WorkspaceForm {
  name: string;
  color: string;
}

const colors = [
  "#27f580",
  "#60a5fa",
  "#a78bfa",
  "#fb7185",
  "#fbbf24",
];

export const SidebarWorkspaceForm = ({
  onClose,
}: SidebarWorkspaceFormProps) => {
  const [createError, setCreateError] = useState<string | null>(null);
  const { createWorkspace } = useWorkspaces();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceForm>({
    defaultValues: {
      name: "",
      color: colors[0],
    },
  });

  const selectedColor = watch("color");

  const onSubmit = handleSubmit(async (values) => {
    setCreateError(null);

    try {
      const workspace = await createWorkspace(values);
      onClose();
      navigate(`/projects?workspace=${workspace.id}`);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Nie udało się utworzyć workspace'u.";

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
        p-2.5
      "
    >
      <input
        autoFocus
        placeholder="Nazwa workspace'u"
        className="
          w-full
          rounded-lg
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          px-2.5
          py-2
          text-sm
          outline-none
          focus:border-[var(--color-primary)]
        "
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
        <p className="mt-1 text-xs text-[var(--color-danger)]">
          {createError}
        </p>
      )}

      <input type="hidden" {...register("color")} />

      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Kolor ${color}`}
              onClick={() => setValue("color", color)}
              className={clsx(
                "h-5 w-5 cursor-pointer rounded-full border-2",
                selectedColor === color
                  ? "border-white"
                  : "border-transparent",
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <button
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
          "
        >
          {isSubmitting ? "Tworzę…" : "Utwórz"}
        </button>
      </div>
    </form>
  );
};
