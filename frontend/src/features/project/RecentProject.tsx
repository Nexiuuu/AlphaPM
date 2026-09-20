import { ArrowRight, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import type { Workspace } from "../workspaces/types";
import { Card } from "../../components/ui/Card/Card";

interface RecentProjectsProps {
  workspaces: Workspace[];
  isLoading: boolean;
}

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const RecentProjects = ({
  workspaces,
  isLoading,
}: RecentProjectsProps) => {
  const parseDate = (value: string) =>
    new Date(value.replace(/\.(\d{3})\d+Z$/, ".$1Z"));

  const recentWorkspaces = [...workspaces]
    .sort(
      (first, second) =>
        parseDate(second.createdAt).getTime() -
        parseDate(first.createdAt).getTime(),
    )
    .slice(0, 4);

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Zadania
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
              to={`/projects/${workspace.id}`}
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
                    Utworzono{" "}
                    {dateFormatter.format(new Date(workspace.createdAt))}
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
          <FolderKanban
            className="mx-auto mb-3 text-[var(--color-primary)]"
            size={24}
          />
          <h3 className="font-medium">Nie masz żadnych Zadań</h3>
          <Link
            to="/projects"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            Przejdź do zadań <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </Card>
  );
};
