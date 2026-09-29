import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import {
  createWorkspace as createWorkspaceRequest,
  deleteWorkspace as deleteWorkspaceRequest,
  getWorkspaces,
  updateWorkspace as updateWorkspaceRequest,
} from "../../lib/utils/API/workspaces";
import { useAuth } from "../auth/useAuth";
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  Workspace,
} from "./types";
import { WorkspacesContext } from "./workspacesStore";

export const WorkspacesProvider = ({ children }: PropsWithChildren) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);
  const { session, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = Boolean(session);

  const load = useCallback(async (authenticated: boolean) => {
    const currentRequestId = ++requestId.current;

    setError(null);

    if (!authenticated) {
      setWorkspaces([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await getWorkspaces();

      if (currentRequestId !== requestId.current) return;

      setWorkspaces(data);
    } catch (caughtError) {
      if (currentRequestId !== requestId.current) return;

      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się pobrać workspace'ów.";

      setError(message);
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const reloadWorkspaces = useCallback(async () => {
    if (isAuthLoading) return;

    await load(isAuthenticated);
  }, [isAuthLoading, isAuthenticated, load]);

  useEffect(() => {
    if (isAuthLoading) return;

    queueMicrotask(() => {
      void load(isAuthenticated);
    });
  }, [isAuthLoading, isAuthenticated, load]);

  const createWorkspace = async (input: CreateWorkspaceInput) => {
    const workspace = await createWorkspaceRequest(input);
    setWorkspaces((current) => [workspace, ...current]);

    return workspace;
  };

  const updateWorkspace = async (
    projectId: string,
    input: UpdateWorkspaceInput,
  ) => {
    const updatedWorkspace = await updateWorkspaceRequest(projectId, input);

    setWorkspaces((current) =>
      current.map((workspace) =>
        workspace.id === updatedWorkspace.id ? updatedWorkspace : workspace,
      ),
    );

    return updatedWorkspace;
  };

  const deleteWorkspace = async (projectId: string) => {
    await deleteWorkspaceRequest(projectId);

    setWorkspaces((current) =>
      current.filter((workspace) => workspace.id !== projectId),
    );
  };

  const value = {
    workspaces,
    isLoading,
    isAuthenticated,
    error,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    reloadWorkspaces,
  };

  return (
    <WorkspacesContext.Provider value={value}>
      {children}
    </WorkspacesContext.Provider>
  );
};
