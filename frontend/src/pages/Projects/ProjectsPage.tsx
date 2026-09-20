import { FolderKanban, Plus } from "lucide-react";

import { useWorkspaces } from "../../features/workspaces/useWorkspaces";
import { ProjectCard } from "./ProjectCard/ProjectCard";

export const ProjectsPage = () => {
  const { workspaces, isLoading, isAuthenticated } = useWorkspaces();

  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-7">
        <p className="mb-2 flex select-none items-center gap-2 text-sm text-[var(--color-primary)]">
          <FolderKanban size={16} />
          Twoja przestrzeń pracy
        </p>

        <h2 className="text-3xl font-semibold">Projekty</h2>
      </div>

      {isLoading && (
        <p className="text-[var(--color-text-muted)]">Pobieram projekty…</p>
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
          Zaloguj się, aby zobaczyć swoje projekty.
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
            Pierwszy projekt czeka na utworzenie
          </h3>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Użyj plusa obok napisu Projekty w lewym panelu.
          </p>
        </div>
      )}

      <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {!isLoading &&
          isAuthenticated &&
          workspaces.map((workspace) => (
            <ProjectCard key={workspace.id} workspace={workspace} />
          ))}
      </div>
    </section>
  );
};
