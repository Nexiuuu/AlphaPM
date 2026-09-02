import { FolderKanban, Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { useWorkspaces } from "../features/workspaces/useWorkspaces";

export const ProjectsPage = () => {
  const { workspaces, isLoading, isAuthenticated } = useWorkspaces();
  const [searchParams] = useSearchParams();
  const selectedId = Number(searchParams.get("workspace"));
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === selectedId,
  );

  return (
    <section className="mx-auto max-w-6xl p-8">
      <div className="mb-7">
        <p className="mb-2 text-sm text-[var(--color-text-muted)]">
          Twoja przestrzeń pracy
        </p>

        <h2 className="text-3xl font-semibold">
          {selectedWorkspace?.name ?? "Workspaces"}
        </h2>
      </div>

      {isLoading && (
        <p className="text-[var(--color-text-muted)]">
          Pobieram workspace'y…
        </p>
      )}

      {!isLoading && !isAuthenticated && (
        <div
          className="
            rounded-2xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-6
          "
        >
          Zaloguj się, aby zobaczyć swoje workspace'y.
        </div>
      )}

      {!isLoading && isAuthenticated && workspaces.length === 0 && (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-10
            text-center
          "
        >
          <Plus className="mx-auto mb-3 text-[var(--color-primary)]" />

          <h3 className="font-semibold">
            Pierwszy workspace czeka na utworzenie
          </h3>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Użyj plusa obok napisu Workspaces w lewym panelu.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            to={`/projects?workspace=${workspace.id}`}
            className="
              group
              rounded-2xl
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-5
              transition
              hover:-translate-y-0.5
              hover:border-[var(--color-text-disabled)]
            "
          >
            <div className="mb-8 flex items-center justify-between">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: workspace.color }}
              />

              <FolderKanban
                size={18}
                className="
                  text-[var(--color-text-disabled)]
                  group-hover:text-[var(--color-text)]
                "
              />
            </div>

            <h3 className="font-semibold">{workspace.name}</h3>

            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Otwórz projekty workspace'u
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
