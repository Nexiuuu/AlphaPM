import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";
import {
  BASIC_WORKSPACE_LIMIT,
  COLLAPSED_WORKSPACES_COUNT,
} from "../../../../features/workspaces/constants";
import { SidebarWsItem } from "./SidebarWorkspaceItem";

interface SidebarWorkspaceListProps {
  isCollapsed: boolean;
  isExpanded: boolean;
}

export const SidebarWorkspaceList = ({
  isCollapsed,
  isExpanded,
}: SidebarWorkspaceListProps) => {
  const {
    workspaces,
    isLoading,
    isAuthenticated,
    error,
    reloadWorkspaces,
  } = useWorkspaces();

  const visibleWorkspaces = isExpanded
    ? workspaces
    : workspaces.slice(0, COLLAPSED_WORKSPACES_COUNT);

  const hasReachedLimit = workspaces.length >= BASIC_WORKSPACE_LIMIT;

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
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void reloadWorkspaces()}
            className="mt-1 cursor-pointer underline"
          >
            Spróbuj ponownie
          </button>
        </li>
      )}

      {visibleWorkspaces.map((workspace) => (
        <SidebarWsItem key={workspace.id} {...workspace} isCollapsed={isCollapsed} />
      ))}

      {hasReachedLimit && !isCollapsed && (
        <li className="px-3 pt-2 text-xs text-[var(--color-text-disabled)]">
          Osiągnięto limit planu podstawowego.
        </li>
      )}
    </ul>
  );
};
