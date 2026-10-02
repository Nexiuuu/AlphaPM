import { NavLink } from "react-router-dom";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";

interface SidebarNavItemProps {
  label: ParseKeys<"sidebar">;
  href: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

export const SidebarNavItem = ({
  label,
  href,
  icon,
  isCollapsed,
}: SidebarNavItemProps) => {
  const { t } = useTranslation("sidebar");
  const translatedLabel = t(label);
  const Icon = icon;

  // const handleClick = () => {
  //
  // };

  return (
    <li>
      <NavLink
        to={href}
        title={isCollapsed ? translatedLabel : undefined}
        // onClick={handleClick}
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 transition-colors duration-150",
            isCollapsed && "md:justify-center md:px-2",
            isActive
              ? "bg-[var(--color-surface-active)] text-[var(--color-text)] focus:outline-none"
              : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
          )
        }
      >
        <Icon size={18} aria-hidden="true" />

        <span className={isCollapsed ? "md:hidden" : ""}>
          {translatedLabel}
        </span>
      </NavLink>
    </li>
  );
};
