import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useWorkspaces } from "../../features/workspaces/useWorkspaces";
import { WorkspaceColorPicker } from "../../features/workspaces/components/WorkspaceColorPicker";
import { Typebar } from "../../components/ui/typebar/Typebar";
import { useTranslation } from "react-i18next";

interface ProjectForm {
  name: string;
  color: string;
}

export const CreateProjectForm = () => {
  const [createError, setCreateError] = useState<string | null>(null);
  const { createWorkspace } = useWorkspaces();
  const navigate = useNavigate();
  const { t } = useTranslation("createproject");

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

  const onSubmit = handleSubmit(async (values) => {
    setCreateError(null);

    try {
      const workspace = await createWorkspace(values);
      navigate(`/projects/${workspace.id}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : t("unable");

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
        label={t("label.projectName")}
        placeholder=" "
        {...register("name", {
          required: t("enterName"),
          minLength: {
            value: 2,
            message: t("min"),
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
          {t("color")}
        </p>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {t("colorDesc")}
        </p>

        <div className="mt-3">
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <WorkspaceColorPicker
                id="project-color"
                value={field.value}
                onChange={field.onChange}
                description={t("sample")}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Link
          to={"/projects"}
          className="
            px-2.5
            py-1.5  
            text-xs 
            font-semibold 
            text-[var(--color-text)]
            rounded-md 
            border 
            border-[var(--color-border)]
            bg-transparent
            cursor-pointer
            transition-colors
            hover:opacity-65
            focus:outline-none
          "
        >
          {t("cancel")}
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
              px-2.5
              py-1.5 
              text-xs 
              font-medium 
              rounded-md 
              cursor-pointer
              bg-[var(--color-primary)]
              text-[var(--color-primary-foreground)] 
              hover:opacity-65
              transition-opacity
              hover:border-[var(--color-primary-hover)]
              focus:outline-none
            "
        >
          {isSubmitting ? t("creating") : t("create")}
        </button>
      </div>
    </form>
  );
};