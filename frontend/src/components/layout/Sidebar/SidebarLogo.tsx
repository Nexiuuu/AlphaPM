import { ArrowRightFromLine } from "lucide-react";

interface SidebarLogoProps {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

export const SidebarLogo = ({ isCollapsed, onCollapseToggle }: SidebarLogoProps) => {
  return (
    <div
      className={`
        relative
        border-b
        border-[var(--color-border)]
        px-4
        md:px-6
        py-5
        ${isCollapsed ? "md:pb-12" : ""}
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] font-bold text-[var(--color-primary-foreground)]">
            A
          </div>

          <div className={isCollapsed ? "md:hidden" : ""}>
            <h1 className="font-semibold text-[var(--color-text)]">AlphaPM</h1>
            <p className="text-sm text-[var(--color-text-muted)]">Project Management</p>
          </div>
        </div>

        <button
          type="button"
          className={`absolute hidden rounded-lg p-2 text-[var(--color-text-muted)] transition-all duration-300 ease-in-out hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] md:inline-flex ${isCollapsed ? "bottom-2 left-1/2 -translate-x-1/2" : "right-4 top-5"}`}
          aria-label={isCollapsed ? "Rozwiń sidebar" : "Zwiń sidebar"}
          onClick={onCollapseToggle}
        >
          <ArrowRightFromLine
            size={18}
            className={`transition-transform duration-300 ease-in-out ${isCollapsed ? "rotate-0" : "rotate-180"}`}
          />
        </button>
      </div>
    </div>
  );
};
