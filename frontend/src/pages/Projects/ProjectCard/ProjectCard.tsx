import { Ellipsis, FolderKanban, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import type { Workspace } from "../../../features/workspaces/types";
import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { ProjectEditorPopover } from "./ProjectMenu/ProjectCardEditor";

interface ProjectCardProps {
  workspace: Workspace;
}

export const ProjectCard = ({ workspace }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState<"name" | "color" | "delete" | null>(
    null,
  );

  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => {
    if (!editMode) {
      setIsOpen(false);
    }
  });

  const handleCloseEditor = () => {
    setEditMode(null);
    setIsOpen(false);
  };

  return (
    <article
      className={`
                group
                relative
                rounded-2xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                transition
                ${!editMode ? "hover:-translate-y-0.5 hover:border-[var(--color-text-disabled)]" : ""}
                ${isOpen || editMode ? "z-20" : "z-0"}
            `}
    >
      {editMode ? (
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              {editMode === "name" && "Edycja nazwy"}
              {editMode === "color" && "Zmiana koloru"}
              {editMode === "delete" && "Usuwanie projektu"}
            </span>
            <button
              type="button"
              onClick={() => setEditMode(null)}
              className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
            >
              <ArrowLeft size={14} /> Wróć
            </button>
          </div>

          <ProjectEditorPopover
            mode={editMode}
            workspace={workspace}
            onClose={handleCloseEditor}
          />
        </div>
      ) : (
        <>
          <Link
            to={`/projects/${workspace.id}`}
            className="
                            block
                            h-full
                            w-full
                            p-5
                            pr-14
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-inset
                            focus-visible:ring-[var(--color-primary)]
                        "
          >
            <span
              className="mb-8 block h-3 w-3 rounded-full"
              style={{ backgroundColor: workspace.color }}
            />

            <div className="flex items-center gap-2">
              <FolderKanban
                size={18}
                className="
                                    text-[var(--color-text-disabled)]
                                    group-hover:text-[var(--color-text)]
                                "
              />

              <h3 className="font-semibold">{workspace.name}</h3>
            </div>

            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Otwórz projekty workspace'u
            </p>
          </Link>

          <div ref={menuRef} className="absolute right-3 top-3 z-10">
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-label={`Otwórz menu projektu ${workspace.name}`}
              aria-expanded={isOpen}
              aria-controls={`project-menu-${workspace.id}`}
              title="Zarządzaj projektem"
              className="
                                cursor-pointer
                                rounded-lg
                                p-2
                                text-[var(--color-text-disabled)]
                                transition-colors
                                hover:bg-[var(--color-surface-hover)]
                                hover:text-[var(--color-text)]
                                focus:outline-none
                            "
            >
              {isOpen ? <X size={18} /> : <Ellipsis size={18} />}
            </button>

            {isOpen && (
              <div
                id={`project-menu-${workspace.id}`}
                className="
                                    absolute
                                    right-0
                                    top-10
                                    z-30
                                    flex
                                    w-48
                                    flex-col
                                    whitespace-nowrap
                                    rounded-lg
                                    border
                                    border-[var(--color-border)]
                                    bg-[var(--color-surface)]
                                    p-3
                                    text-[var(--color-text)]
                                    shadow-lg
                                    gap-1
                                "
              >
                <button
                  type="button"
                  onClick={() => setEditMode("name")}
                  className="
                                        cursor-pointer
                                        rounded-lg
                                        text-[var(--color-text-disabled)]
                                        transition-colors
                                        hover:bg-[var(--color-surface-hover)]
                                        hover:text-[var(--color-text)]
                                        focus:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-[var(--color-primary)]
                                    "
                >
                  Edytuj projekt
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode("color")}
                  className="
                                        cursor-pointer
                                        rounded-lg
                                        text-[var(--color-text-disabled)]
                                        transition-colors
                                        hover:bg-[var(--color-surface-hover)]
                                        hover:text-[var(--color-text)]
                                        focus:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-[var(--color-primary)]
                                    "
                >
                  Zmień kolor
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode("delete")}
                  className="
                                        cursor-pointer
                                        rounded-lg
                                        text-[var(--color-text-muted)]
                                        transition-colors
                                        bg-[#ef4444]
                                        hover:bg-[#eb5c5c]
                                        hover:text-[var(--color-text)]
                                        focus:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-[var(--color-primary)]
                                    "
                >
                  Usuń projekt
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </article>
  );
};
