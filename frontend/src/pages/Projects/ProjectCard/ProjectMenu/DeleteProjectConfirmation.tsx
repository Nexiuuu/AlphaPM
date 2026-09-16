import { useState } from "react";

import type { Workspace } from "../../../../features/workspaces/types";
import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";

interface DeleteProjectConfirmationProps {
    workspace: Workspace;
    onClose: () => void;   
}

export const DeleteProjectConfirmation = ({ workspace, onClose }: DeleteProjectConfirmationProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const { deleteWorkspace } = useWorkspaces();

    const handleDelete = async () => {
        setDeleteError(null);
        setIsDeleting(true);

        try {
            await deleteWorkspace(workspace.id);
            onClose();
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Nie udało się usunąć projektu.";

            setDeleteError(message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs text-red-500 whitespace-normal">
                Czy na pewno chcesz usunąć projekt <strong>{workspace.name}</strong>?
            </p>

            {deleteError && (
                <p className="text-xs font-medium text-red-500">
                    {deleteError}
                </p>
            )}

            <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="
                    mt-1
                    cursor-pointer
                    rounded-lg
                    bg-red-600
                    px-2.5
                    py-1.5
                    text-xs
                    font-semibold
                    text-white
                    hover:bg-red-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    focus:outline-none
                "
            >
                {isDeleting ? "Usuwam…" : "Usuń bezpowrotnie"}
            </button>
        </div>
    );
};
