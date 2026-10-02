import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";
import {
  BASIC_WORKSPACE_LIMIT,
  COLLAPSED_WORKSPACES_COUNT,
} from "../../../../features/workspaces/constants";
import { LoadingText } from "../../../ui/LoadingText/LoadingText";
import { SidebarWsItem } from "./SidebarWorkspaceItem";
import { AuthenticatedContent } from "../../../../features/auth/components/AuthenticatedContent";
import { useTranslation } from "react-i18next";

interface SidebarWorkspaceListProps {
  isCollapsed: boolean;
  isExpanded: boolean;
}

export const SidebarWorkspaceList = ({
  isCollapsed,
  isExpanded,
}: SidebarWorkspaceListProps) => {
  const { t } = useTranslation("common");

  const { workspaces, isLoading, error, reloadWorkspaces } =
    useWorkspaces();

  const visibleWorkspaces = isExpanded
    ? workspaces
    : workspaces.slice(0, COLLAPSED_WORKSPACES_COUNT);

  const hasReachedLimit = workspaces.length >= BASIC_WORKSPACE_LIMIT;

  return (
    <ul className="mt-1">
      {isLoading && (
        <li
          className={`px-3 py-2 text-sm text-[var(--color-text-disabled)] ${isCollapsed ? "md:hidden" : ""}`}
        >
          <LoadingText label={t("loading")} />
        </li>
      )}

      {!isLoading && workspaces.length === 0 && (
        <li
          className={`px-3 py-2 text-sm text-[var(--color-text-disabled)] ${isCollapsed ? "md:hidden" : ""}`}
        >
          <AuthenticatedContent fallback={t("list")}>
            {t("noProjects")}
          </AuthenticatedContent>
        </li>
      )}

      {error && (
        <li
          className={`px-3 py-2 text-xs text-[var(--color-danger)] ${isCollapsed ? "md:hidden" : ""}`}
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void reloadWorkspaces()}
            className="mt-1 cursor-pointer underline"
          >
            {t("tryAgain")}
          </button>
        </li>
      )}

      {visibleWorkspaces.map((workspace) => (
        <SidebarWsItem
          key={workspace.id}
          {...workspace}
          isCollapsed={isCollapsed}
        />
      ))}

      {hasReachedLimit && !isCollapsed && (
        <li className="px-3 pt-2 text-xs text-[var(--color-text-disabled)]">
          {t("limit")}
        </li>
      )}
    </ul>
  );
};
