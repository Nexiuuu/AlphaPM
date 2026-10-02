import { ArrowRightFromLine } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SidebarLogoProps {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

export const SidebarLogo = ({
  isCollapsed,
  onCollapseToggle,
}: SidebarLogoProps) => {
  const { t } = useTranslation("sidebar");

  return (
    <div
      className={`
        relative
        flex
        items-center
        justify-between
        border-b
        border-[var(--color-border)]
        px-4
        md:px-6
        py-5
        ${isCollapsed ? "md:justify-center" : ""}
      `}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] font-bold text-[var(--color-primary-foreground)]">
          A
        </div>

        <div className={isCollapsed ? "md:hidden" : ""}>
          <h1 className="font-semibold text-[var(--color-text)]">AlphaPM</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{t("pm")}</p>
        </div>
      </div>

      <button
        type="button"
        className="
          absolute 
          right-0 
          top-4 
          z-10 
          hidden 
          translate-x-1/2 
          rounded-lg 
          border 
          border-[var(--color-border)] 
          bg-[var(--color-surface)] 
          p-2 
          text-[var(--color-text-muted)] 
          transition-colors 
          hover:text-[var(--color-primary)] 
          md:inline-flex"
        aria-label={isCollapsed ? t("aria.expandSidebar") : t("aria.collapseSidebar")}
        onClick={onCollapseToggle}
      >
        <ArrowRightFromLine
          size={18}
          className={`transition-transform duration-300 ease-in-out ${isCollapsed ? "rotate-0" : "rotate-180"}`}
        />
      </button>
    </div>
  );
};
