import { Plus, X } from "lucide-react";
import { useState } from "react";

import { useWorkspaces } from "../../../../features/workspaces/useWorkspaces";
import { SidebarWorkspaceForm } from "./SidebarWorkspaceForm";
import { SidebarWorkspaceList } from "./SidebarWorkspaceList";

interface SidebarWorkspaceProps {
  isCollapsed: boolean;
}

export const SidebarWS = ({ isCollapsed }: SidebarWorkspaceProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { isAuthenticated } = useWorkspaces();

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
        <h2
          className={isCollapsed ? "md:sr-only" : "cursor-pointer text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text)]"}
        >
          Workspaces
        </h2>

        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          disabled={!isAuthenticated}
          aria-label="Utwórz workspace"
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

      <SidebarWorkspaceList isCollapsed={isCollapsed} />
    </section>
  );
};
