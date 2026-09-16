import type { Workspace } from "../../../../features/workspaces/types";
import { EditProjectForm } from "./EditProjectForm";
import { ColorProjectForm } from "./ColorProjectForm";
import { DeleteProjectConfirmation } from "./DeleteProjectConfirmation";

interface EditorOptionsProps {
    mode: 'name' | 'color' | 'delete';
    workspace: Workspace;
    onClose: () => void;
}

export const ProjectEditorPopover = ({ mode, workspace, onClose }: EditorOptionsProps) => {
    
    if (mode === 'name') {
        return (
            <EditProjectForm 
                workspace={workspace}
                onClose={onClose}
            />
        );
    } 
    
    if (mode === 'color') {
        return (
            <ColorProjectForm 
                workspace={workspace}
                onClose={onClose}
            />
        );
    }

    return (
        <DeleteProjectConfirmation 
            workspace={workspace}
            onClose={onClose}
        />
    );
};
