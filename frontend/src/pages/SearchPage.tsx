import { ChevronDown, FolderSearch } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useWorkspaces } from "../features/workspaces/useWorkspaces";
import { SearchProjects } from "../features/search/projects/SearchProjects";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const { workspaces, isLoading, isAuthenticated } = useWorkspaces();
    const { t } = useTranslation("search");

    const [isProjectsOpen, setIsProjectsOpen] = useState(true);
    const [isTeamsOpen, setIsTeamsOpen] = useState(true);
    const [isTasksOpen, setIsTasksOpen] = useState(true);

    const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

    const filterProjects = workspaces?.filter((project) => {
        return project.name.toLowerCase().includes(searchQuery);
    }) || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
            {(isAuthenticated && isLoading) ? (
                <div>

                </div>
            ) : (
                <div className="space-y-8">
                    {/* Projects Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 py-2">
                            <h1 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                                Projekty
                                <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                                    {filterProjects.length}
                                </span>
                            </h1>
                            <button
                                type="button"
                                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                                className="p-1 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                                aria-label="Zwiń/Rozwiń projekty"
                            >
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-300 ${isProjectsOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        </div>

                        {isProjectsOpen && (
                            <div>
                                {filterProjects.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50">
                                        <div className="p-3 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-disabled)] mb-3">
                                            <FolderSearch size={28} />
                                        </div>
                                        <p className="text-sm text-[var(--color-text-muted)]">
                                            {t("projects.noProject")}
                                        </p>
                                    </div>
                                ) : (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 list-none p-0 m-0">
                                        {filterProjects.map((project) => (
                                            <li key={project.id}>
                                                <SearchProjects workspace={project} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Teams Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 py-2">
                            <h1 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                                Zespoły
                                <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                                    0
                                </span>
                            </h1>
                            <button
                                type="button"
                                onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                                className="p-1 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                                aria-label="Zwiń/Rozwiń zespoły"
                            >
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-300 ${isTeamsOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        </div>
                        {isTeamsOpen && (
                            <div className="text-center text-sm text-[var(--color-text-muted)] py-4">

                            </div>
                        )}
                    </div>

                    {/* Tasks Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 py-2">
                            <h1 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                                Zadania
                                <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                                    0
                                </span>
                            </h1>
                            <button
                                type="button"
                                onClick={() => setIsTasksOpen(!isTasksOpen)}
                                className="p-1 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                                aria-label="Zwiń/Rozwiń zadania"
                            >
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-300 ${isTasksOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        </div>
                        {isTasksOpen && (
                            <div className="text-center text-sm text-[var(--color-text-muted)] py-4">

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};