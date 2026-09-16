import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import type { Workspace } from "../../../../features/workspaces/types";
import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";

interface ColorProjectFormProps {
    workspace: Workspace;
    onClose: () => void;
}

interface IColorWorkspaceInput {
    color: string;
}

export const ColorProjectForm = ({ workspace, onClose }: ColorProjectFormProps) => {
    const [updateError, setUpdateError] = useState<string | null>(null);

    const { updateWorkspace } = useWorkspaces();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isDirty },
    } = useForm<IColorWorkspaceInput>({
        defaultValues: {
            color: workspace.color,
        },
    });

    const onSubmit: SubmitHandler<IColorWorkspaceInput> = async (data) => {
        setUpdateError(null);

        try {
            await updateWorkspace(workspace.id, {
                name: workspace.name,
                color: data.color,
            });

            onClose();
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Wystąpił błąd podczas zmiany koloru projektu.";

            setUpdateError(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <label
                htmlFor={`project-color-${workspace.id}`}
                className="text-xs font-semibold text-[var(--color-text-muted)]"
            >
                Wybierz kolor projektu
            </label>
            
            <div className="flex items-center gap-3 my-1">
                <input
                    id={`project-color-${workspace.id}`}
                    type="color"
                    {...register("color")}
                    className="
                        h-8
                        w-12
                        cursor-pointer
                        rounded-md
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-surface-hover)]
                        p-1
                    "
                />
                <span className="text-xs text-[var(--color-text)]">
                    Wybierz nową barwę
                </span>
            </div>

            {updateError && (
                <p className="text-xs font-medium text-red-500">
                    {updateError}
                </p>
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
                {isSubmitting ? "Zapisuję…" : "Zapisz kolor"}
            </button>
        </form>
    );
};
