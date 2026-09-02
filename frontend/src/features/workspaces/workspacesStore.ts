import { createContext } from "react";

import type { CreateWorkspaceInput, Workspace } from "./types";

export interface WorkspacesContextValue {
  workspaces: Workspace[];
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  createWorkspace: (input: CreateWorkspaceInput) => Promise<Workspace>;
}

export const WorkspacesContext = createContext<WorkspacesContextValue | null>(
  null,
);
