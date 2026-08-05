import { NavLink } from "react-router-dom";

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
        className="
          flex
          items-center
          gap-3
          rounded-[var(--radius-md)]
          px-3
          py-2
          text-[var(--color-text-muted)]
          transition-all
          duration-150
          hover:bg-[var(--color-surface-hover)]
          hover:text-[var(--color-text)]
        "
      >
        {label}
      </NavLink>
    </li>
  );
}