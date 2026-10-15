import { ArrowRight, FolderKanban, Loader2, Search, X } from "lucide-react";
import { useState, useRef, useMemo, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { Typebar } from "../../ui/typebar/Typebar";
import { useTranslation } from "react-i18next";
import { useWorkspaces } from "../../../features/workspaces/useWorkspaces";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { workspaces, isLoading, error } = useWorkspaces();

  const searchRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(["header", "common", "search"]);

  useClickOutside(searchRef, () => {
    setIsOpen(false);
  });

  const filteredProjects = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery || !workspaces) return [];

    return workspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(trimmedQuery)
    );
  }, [query, workspaces]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="flex items-center justify-end relative">
      <div
        className={`
          flex 
          items-center 
          h-10 
          bg-[var(--color-surface)] 
          border 
          border-[var(--color-border)] 
          rounded-full 
          overflow-hidden
          transition-all 
          duration-300 
          ease-in-out
          ${isOpen ? "w-[min(20rem,calc(100vw-8rem))] px-4" : "w-10 px-0 border-transparent bg-transparent"}
        `}
      >
        <Typebar
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={t("search")}
          autoFocus={isOpen}
          variant={isOpen ? "search" : "hidden"}
        />

        {isOpen ? (
          <button
            onClick={handleClose}
            className="
              cursor-pointer 
              text-neutral-400 
              hover:text-neutral-200 
              ml-2 
              shrink-0
            "
            aria-label={t("aria.closeSearch")}
          >
            <X size={18} />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="
              cursor-pointer 
              text-neutral-400 
              hover:text-[var(--color-text)] 
              p-2 
              rounded-full 
              hover:bg-neutral-800 
              shrink-0 
              absolute 
              right-0
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-primary)]
            "
            aria-label={t("aria.openSearch")}
          >
            <Search size={18} />
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div
          className="
            absolute 
            top-full 
            right-0 
            mt-2 
            w-full 
            min-w-[18rem] 
            max-w-[24rem] 
            bg-[var(--color-surface)] 
            border 
            border-[var(--color-border)] 
            rounded-xl 
            shadow-xl 
            p-2 
            z-50 
            max-h-80 
            overflow-y-auto
          "
        >
          {isLoading ? (
            <div className="flex items-center justify-center p-4 text-neutral-400 gap-2">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-sm">{t("search:search")}</span>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-sm text-[var(--color-danger)]">
              {t("common:projectsError")} {error}
            </div>
          ) : filteredProjects.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {filteredProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    to={`/projects/${project.id}`}
                    onClick={handleClose}
                    className="
                      w-full 
                      p-2.5
                      rounded-lg 
                      hover:bg-[var(--color-surface-hover)]
                      transition-colors 
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: project.color }}
                      aria-hidden="true"
                    />
                    <FolderKanban
                      size={17}
                      className="shrink-0 text-[var(--color-text-muted)]"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-text)]">
                      {project.name}
                    </span>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-[var(--color-text-muted)]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-neutral-400">
              {t("search:noResult")} "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
