import { useWorkspaces } from "../../../features/workspaces/useWorkspaces";
import { SidebarWsItem } from "./SidebarWorkspaceItem";

export const SidebarWorkspaceList = () => {
  const {
    workspaces,
    isLoading,
    isAuthenticated,
    error,
  } = useWorkspaces();

  return (
    <ul className="mt-1">
      {isLoading && (
        <li className="px-3 py-2 text-sm text-[var(--color-text-disabled)]">
          Ładowanie…
        </li>
      )}

      {!isLoading && isAuthenticated && workspaces.length === 0 && (
        <li className="px-3 py-2 text-sm text-[var(--color-text-disabled)]">
          Nie masz jeszcze workspace'u.
        </li>
      )}

      {!isAuthenticated && (
        <li className="px-3 py-2 text-sm text-[var(--color-text-disabled)]">
          Zaloguj się, aby zobaczyć listę.
        </li>
      )}

      {error && (
        <li className="px-3 py-2 text-xs text-[var(--color-danger)]">
          {error}
        </li>
      )}

      {workspaces.map((workspace) => (
        <SidebarWsItem key={workspace.id} {...workspace} />
      ))}
    </ul>
  );
};
