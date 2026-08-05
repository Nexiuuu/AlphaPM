import { NavLink } from "react-router-dom";
import clsx from "clsx";

interface SidebarNavItemProps {
  label: string;
  href: string;
}

export const SidebarNavItem = ({
  label,
  href,
}: SidebarNavItemProps) => {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
            isActive
              ? "bg-[var(--color-surface-active)] text-[var(--color-text)]"
              : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          )
        }
      >
        {label}
      </NavLink>
    </li>
  );
}