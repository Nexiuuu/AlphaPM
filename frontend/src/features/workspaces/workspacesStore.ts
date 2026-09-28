import { createContext } from "react";

import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  Workspace,
} from "./types";

export interface WorkspacesContextValue {
  workspaces: Workspace[];
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  createWorkspace: (input: CreateWorkspaceInput) => Promise<Workspace>;
  updateWorkspace: (
    projectId: string,
    input: UpdateWorkspaceInput,
  ) => Promise<Workspace>;
  deleteWorkspace: (projectId: string) => Promise<void>;
  reloadWorkspaces: () => Promise<void>;
}

export const WorkspacesContext = createContext<WorkspacesContextValue | null>(
  null,
);
