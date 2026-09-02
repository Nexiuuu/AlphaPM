import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import {
  getCurrentSession,
  subscribeToAuthChanges,
} from "../../lib/utils/API/auth";
import {
  createWorkspace as createWorkspaceRequest,
  getWorkspaces,
} from "../../lib/utils/API/workspaces";
import type { CreateWorkspaceInput, Workspace } from "./types";
import { WorkspacesContext } from "./workspacesStore";

export const WorkspacesProvider = ({ children }: PropsWithChildren) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    setError(null);
    if (!authenticated) {
      setWorkspaces([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (caughtError) {
      const message = caughtError instanceof Error
        ? caughtError.message
        : "Nie udało się pobrać workspace'ów.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentSession().then((session) => {
      load(Boolean(session));
    });

    const subscription = subscribeToAuthChanges((_event, session) => {
      load(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, [load]);

  const createWorkspace = async (input: CreateWorkspaceInput) => {
    const workspace = await createWorkspaceRequest(input);
    setWorkspaces((current) => [workspace, ...current]);

    return workspace;
  };

  const value = {
    workspaces,
    isLoading,
    isAuthenticated,
    error,
    createWorkspace,
  };

  return (
    <WorkspacesContext.Provider value={value}>
      {children}
    </WorkspacesContext.Provider>
  );
};
