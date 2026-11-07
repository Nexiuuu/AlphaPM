import { useState, type FormEvent } from "react";
import { FolderKanban, LoaderCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { Workspace } from "../../workspaces/types";
import type { CreateTeamInput } from "../types";

interface CreateTeamModalProps {
  projects: Workspace[];
  isProjectsLoading: boolean;
  projectsError: string | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (input: CreateTeamInput) => Promise<void>;
}

export const CreateTeamModal = ({
  projects,
  isProjectsLoading,
  projectsError,
  isSubmitting,
  onClose,
  onSubmit,
}: CreateTeamModalProps) => {
  const { t } = useTranslation("teams");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleProjectToggle = (projectId: string) => {
    setSelectedProjectIds((currentIds) =>
      currentIds.includes(projectId)
        ? currentIds.filter((currentId) => currentId !== projectId)
        : [...currentIds, projectId],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        projectIds: selectedProjectIds,
      });
    } catch (caughtError) {
      setSubmitError(
        caughtError instanceof Error ? caughtError.message : t("createError"),
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-team-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-md)] sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
              {t("createEyebrow")}
            </p>
            <h2
              id="create-team-title"
              className="mt-2 text-xl font-semibold text-[var(--color-text)]"
            >
              {t("createTeam")}
            </h2>
            <p className="mt-1 text-sm leading-5 text-[var(--color-text-muted)]">
              {t("createDescription")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label={t("closeCreateForm")}
            className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
              {t("teamName")}
            </span>
            <input
              autoFocus
              required
              minLength={1}
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t("teamNamePlaceholder")}
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3.5 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
              {t("teamDescription")}
              <span className="ml-1 font-normal text-[var(--color-text-muted)]">
                {t("optional")}
              </span>
            </span>
            <textarea
              maxLength={500}
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={t("teamDescriptionPlaceholder")}
              className="w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3.5 py-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
            />
          </label>

          <fieldset>
            <legend className="mb-1.5 text-sm font-medium text-[var(--color-text)]">
              {t("linkProjects")}
              <span className="ml-1 font-normal text-[var(--color-text-muted)]">
                {t("optional")}
              </span>
            </legend>
            <p className="mb-2 text-xs leading-5 text-[var(--color-text-muted)]">
              {t("linkProjectsDescription")}
            </p>

            <div className="max-h-44 overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-1.5">
              {isProjectsLoading ? (
                <p className="px-3 py-4 text-center text-sm text-[var(--color-text-muted)]">
                  {t("projectsLoading")}
                </p>
              ) : projectsError ? (
                <p className="px-3 py-4 text-sm text-[var(--color-danger)]">
                  {t("projectsLoadError")}
                </p>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <label
                    key={project.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-[var(--color-surface-hover)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProjectIds.includes(project.id)}
                      onChange={() => handleProjectToggle(project.id)}
                      className="h-4 w-4 accent-[var(--color-primary)]"
                    />
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: project.color }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-text)]">
                      {project.name}
                    </span>
                    <FolderKanban
                      size={15}
                      className="shrink-0 text-[var(--color-text-muted)]"
                      aria-hidden="true"
                    />
                  </label>
                ))
              ) : (
                <p className="px-3 py-4 text-center text-sm text-[var(--color-text-muted)]">
                  {t("noProjectsAvailable")}
                </p>
              )}
            </div>
          </fieldset>

          {submitError && (
            <p
              role="alert"
              className="rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 px-3 py-2 text-sm text-[var(--color-danger)]"
            >
              {t("createError")}: {submitError}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 border-t border-[var(--color-border)] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-10 rounded-xl border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)] disabled:opacity-50"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 text-sm font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && <LoaderCircle size={16} className="animate-spin" />}
              {t("createTeam")}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
