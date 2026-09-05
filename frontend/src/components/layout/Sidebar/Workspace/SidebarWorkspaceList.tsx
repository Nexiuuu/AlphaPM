import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";
import { SidebarWsItem } from "./SidebarWorkspaceItem";

interface SidebarWorkspaceListProps {
  isCollapsed: boolean;
}

export const SidebarWorkspaceList = ({ isCollapsed }: SidebarWorkspaceListProps) => {
  const {
    workspaces,
    isLoading,
    isAuthenticated,
    error,
  } = useWorkspaces();

  return (
    <ul className="mt-1">
      {isLoading && (
        <li className={`px-3 py-2 text-sm text-[var(--color-text-disabled)] ${isCollapsed ? "md:hidden" : ""}`}>
          Ładowanie…
        </li>
      )}

      {!isLoading && isAuthenticated && workspaces.length === 0 && (
        <li className={`px-3 py-2 text-sm text-[var(--color-text-disabled)] ${isCollapsed ? "md:hidden" : ""}`}>
          Nie masz jeszcze workspace'u.
        </li>
      )}

      {!isAuthenticated && (
        <li className={`px-3 py-2 text-sm text-[var(--color-text-disabled)] ${isCollapsed ? "md:hidden" : ""}`}>
          Zaloguj się, aby zobaczyć listę.
        </li>
      )}

      {error && (
        <li className={`px-3 py-2 text-xs text-[var(--color-danger)] ${isCollapsed ? "md:hidden" : ""}`}>
          {error}
        </li>
      )}

      {workspaces.map((workspace) => (
        <SidebarWsItem key={workspace.id} {...workspace} isCollapsed={isCollapsed} />
      ))}
    </ul>
  );
};
