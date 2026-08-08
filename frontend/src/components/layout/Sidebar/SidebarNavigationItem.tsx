import { NavLink } from "react-router-dom";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SidebarNavItem = ({
  label,
  href,
  icon,
}: SidebarNavItemProps) => {
  const Icon = icon;

  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 transition-colors duration-150",
            isActive
              ? "bg-[var(--color-surface-active)] text-[var(--color-text)]"
              : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          )
        }
      >
        <Icon size={18} />

        <span>{label}</span>
      </NavLink>
    </li>
  );
};