import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { useFlash } from "../../../../hooks/animations/useFlash";

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

export const SidebarNavItem = ({ label, href, icon, isCollapsed }: SidebarNavItemProps) => {
  const Icon = icon;
  const location = useLocation();
  const { trigger } = useFlash();

  const handleClick = () => {
    if (location.pathname !== href) {
      trigger();
    }
  };

  return (
    <li>
      <NavLink
        to={href}
        title={isCollapsed ? label : undefined}
        onClick={handleClick}
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 transition-colors duration-150",
            isCollapsed && "md:justify-center md:px-2",
            isActive
              ? "bg-[var(--color-surface-active)] text-[var(--color-text)]"
              : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
          )
        }
      >
        <Icon size={18} aria-hidden="true" />

        <span className={isCollapsed ? "md:hidden" : ""}>{label}</span>
      </NavLink>
    </li>
  );
};
