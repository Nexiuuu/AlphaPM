import {
  useCallback,
  useEffect,
  useRef,
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
  const requestId = useRef(0);

  const load = useCallback(async (authenticated: boolean) => {
    const currentRequestId = ++requestId.current;

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

      if (currentRequestId !== requestId.current) return;

      setWorkspaces(data);
    } catch (caughtError) {
      if (currentRequestId !== requestId.current) return;

      const message = caughtError instanceof Error
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
    try {
      const session = await getCurrentSession();
      await load(Boolean(session));
    } catch (caughtError) {
      const message = caughtError instanceof Error
        ? caughtError.message
        : "Nie udało się sprawdzić sesji użytkownika.";

      setError(message);
      setIsLoading(false);
    }
  }, [load]);

  useEffect(() => {
    getCurrentSession()
      .then((session) => {
        void load(Boolean(session));
      })
      .catch((caughtError: unknown) => {
        const message = caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się sprawdzić sesji użytkownika.";

        setError(message);
        setIsLoading(false);
      });

    const subscription = subscribeToAuthChanges((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        void load(Boolean(session));
      }
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
    reloadWorkspaces,
  };

  return (
    <WorkspacesContext.Provider value={value}>
      {children}
    </WorkspacesContext.Provider>
  );
};
