import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";

import type { Workspace } from "../../../../features/workspaces/types";
import { WorkspaceColorPicker } from "../../../../features/workspaces/components/WorkspaceColorPicker";
import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("projects");

    const {
        register,
        control,
        handleSubmit,
        formState: { isSubmitting, isDirty },
    } = useForm<IColorWorkspaceInput>({
        defaultValues: {
            color: workspace.color,
        },
    });
    const selectedColor = useWatch({ control, name: "color" });

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
                : t("colorProjectForm.errorMsg");

            setUpdateError(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-[var(--color-text-muted)]">
                {t("colorProjectForm.selectColor")}
            </p>

            <div className="my-1">
                <WorkspaceColorPicker
                    id={`project-color-${workspace.id}`}
                    color={selectedColor}
                    description={t("colorProjectForm.sample")}
                    registration={register("color")}
                />
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
                {isSubmitting ? t("colorProjectForm.savingColor") : t("colorProjectForm.saveColor")}
            </button>
        </form>
    );
};
