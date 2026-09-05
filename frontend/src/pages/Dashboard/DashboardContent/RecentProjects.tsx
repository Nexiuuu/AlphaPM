import { ArrowRight, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "../../../components/ui/Card/Card";
import type { Workspace } from "../../../features/workspaces/types";

interface RecentProjectsProps {
  workspaces: Workspace[];
  isLoading: boolean;
}

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const RecentProjects = ({ workspaces, isLoading }: RecentProjectsProps) => {
  const recentWorkspaces = [...workspaces]
    .sort(
      (first, second) =>
        new Date(second.created_at).getTime() - new Date(first.created_at).getTime(),
    )
    .slice(0, 4);

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Projekty
          </p>
          <h2 className="mt-1 text-xl font-semibold">Ostatnio utworzone</h2>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
        >
          Wszystkie <ArrowRight size={16} />
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-17 animate-pulse rounded-xl bg-[var(--color-surface-hover)]/50"
            />
          ))}
        </div>
      ) : recentWorkspaces.length > 0 ? (
        <div className="mt-5 space-y-2">
          {recentWorkspaces.map((workspace) => (
            <Link
              key={workspace.id}
              to={`/projects?workspace=${workspace.id}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: workspace.color }}
                />
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {workspace.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--color-text-muted)]">
                    Utworzono {dateFormatter.format(new Date(workspace.created_at))}
                  </span>
                </span>
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 text-[var(--color-text-disabled)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-[var(--color-border)] px-5 py-10 text-center">
          <FolderKanban className="mx-auto mb-3 text-[var(--color-primary)]" size={24} />
          <h3 className="font-medium">Nie masz jeszcze projektów</h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Utwórz pierwszy workspace, aby zacząć planować pracę.
          </p>
          <Link
            to="/projects"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            Przejdź do projektów <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </Card>
  );
};
