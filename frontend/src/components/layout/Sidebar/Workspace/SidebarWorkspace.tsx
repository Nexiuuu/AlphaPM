import { ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";

import {
  BASIC_WORKSPACE_LIMIT,
  COLLAPSED_WORKSPACES_COUNT,
} from "../../../../features/workspaces/constants";
import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";
import { SidebarWorkspaceForm } from "./SidebarWorkspaceForm";
import { SidebarWorkspaceList } from "./SidebarWorkspaceList";

interface SidebarWorkspaceProps {
  isCollapsed: boolean;
}

export const SidebarWS = ({ isCollapsed }: SidebarWorkspaceProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isListExpanded, setIsListExpanded] = useState(true);
  const { isAuthenticated, workspaces } = useWorkspaces();

  const canCollapseList = workspaces.length > COLLAPSED_WORKSPACES_COUNT;
  const hasReachedLimit = workspaces.length >= BASIC_WORKSPACE_LIMIT;
  const isCreateDisabled = !isAuthenticated || hasReachedLimit;

  return (
    <section className="px-3">
      <div
        className="
          group
          flex
          items-center
          justify-between
          px-2
          py-1.5
        "
      >
        <button
          type="button"
          onClick={() => setIsListExpanded(!isListExpanded)}
          disabled={!canCollapseList}
          className={
            isCollapsed
              ? "md:sr-only"
              : "flex cursor-pointer items-center gap-1.5 disabled:cursor-default"
          }
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text)]">
            Workspaces
          </h2>

          <span className="text-xs text-[var(--color-text-disabled)]">
            {workspaces.length}/{BASIC_WORKSPACE_LIMIT}
          </span>

          {canCollapseList && (
            <ChevronDown
              size={14}
              className={`transition-transform ${isListExpanded ? "rotate-180" : ""}`}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          disabled={isCreateDisabled}
          aria-label={
            hasReachedLimit
              ? "Osiągnięto limit 5 workspace'ów"
              : "Utwórz workspace"
          }
          title={
            hasReachedLimit
              ? "Plan podstawowy pozwala utworzyć maksymalnie 5 workspace'ów"
              : undefined
          }
          className={
            isCollapsed
              ? "cursor-pointer p-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-20 md:mx-auto"
              : "cursor-pointer p-0.5 text-[var(--color-text-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-20"
          }
        >
          {isCreating ? <X size={15} /> : <Plus size={15} />}
        </button>
      </div>

      {isCreating && (
        <SidebarWorkspaceForm onClose={() => setIsCreating(false)} />
      )}

      <SidebarWorkspaceList
        isCollapsed={isCollapsed}
        isExpanded={isListExpanded}
      />
    </section>
  );
};
