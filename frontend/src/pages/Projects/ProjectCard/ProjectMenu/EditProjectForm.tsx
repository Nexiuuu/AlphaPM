import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Workspace } from "../../../../features/workspaces/types";
import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";
import { useTranslation } from "react-i18next";

interface EditProjectFormProps {
    workspace: Workspace;
    onClose: () => void;
}

interface IEditWorkspaceInput {
    name: string;
}

export const EditProjectForm = ({ workspace, onClose }: EditProjectFormProps) => {
    const [updateError, setUpdateError] = useState<string | null>(null);

    const { updateWorkspace } = useWorkspaces();

    const { t } = useTranslation("projects");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<IEditWorkspaceInput>({
        defaultValues: {
            name: workspace.name,
        },
    });

    const onSubmit: SubmitHandler<IEditWorkspaceInput> = async (data) => {
        setUpdateError(null);

        try {
            await updateWorkspace(workspace.id, {
                name: data.name.trim(),
                color: workspace.color
            });

            onClose();
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : t("editProjectForm.errorMsg");

            setUpdateError(message);
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2">
            <label
                htmlFor={`project-name-${workspace.id}`}
                className="text-xs font-semibold text-[var(--color-text-muted)]"
            >
                {t("editProjectForm.newName")}
            </label>

            <input
                id={`project-name-${workspace.id}`}
                type="text"
                aria-invalid={Boolean(errors.name)}
                {...register("name", {
                    required: t("editProjectForm.name"),
                    validate: (value) =>
                        value.trim().length >= 2 || t("editProjectForm.charMin"),
                    maxLength: {
                        value: 60,
                        message: t("editProjectForm.charLimit"),
                    },
                })}
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-2 py-1 text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />

            {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
            )}

            {updateError && (
                <p className="text-xs text-red-500 font-medium">{updateError}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="
                    mt-1
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
                {isSubmitting ? t("colorProjectForm.savingColor") : t("colorProjectForm.saveColor")}
            </button>
        </form>
    );
};
