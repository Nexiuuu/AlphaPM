import { FolderKanban, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Workspace } from "../../../features/workspaces/types";
import { useTranslation } from "react-i18next";

interface SearchProjectsProps {
    workspace: Workspace;
}

export const SearchProjects = ({ workspace }: SearchProjectsProps) => {
    const { t } = useTranslation("projects");

    return (
        <article
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                shadow-xs
                transition-all
                duration-200
                hover:border-[var(--color-primary)]/50
                hover:shadow-md
                hover:-translate-y-0.5
            "
        >
            <Link
                to={`/projects/${workspace.id}`}
                className="
                    flex
                    flex-col
                    justify-between
                    h-full
                    w-full
                    p-5
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-[var(--color-primary)]
                "
            >
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <span
                            className="h-3.5 w-3.5 rounded-full ring-4 ring-[var(--color-surface)] shadow-xs"
                            style={{ backgroundColor: workspace.color }}
                        />
                        <ArrowRight
                            size={16}
                            className="
                                text-[var(--color-text-disabled)] 
                                opacity-0 
                                -translate-x-2 
                                transition-all 
                                duration-200 
                                group-hover:opacity-100 
                                group-hover:translate-x-0 
                                group-hover:text-[var(--color-primary)]
                            "
                        />
                    </div>

                    <div className="flex items-center gap-2.5">
                        <FolderKanban
                            size={18}
                            className="
                                text-[var(--color-text-disabled)]
                                transition-colors
                                group-hover:text-[var(--color-primary)]
                                
                            "
                        />
                        <h3 className="font-semibold text-[var(--color-text)] truncate">
                            {workspace.name}
                        </h3>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-border)]/50 flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-muted)]">
                        {t("projectCard.openProject")}
                    </span>
                </div>
            </Link>
        </article>
    );
};