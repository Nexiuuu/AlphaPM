import clsx from "clsx";
import { Link, useLocation, useSearchParams } from "react-router-dom";

interface WorkspaceItemProps {
  id: number;
  name: string;
  color: string;
}

export const SidebarWsItem = ({
  id,
  name,
  color,
}: WorkspaceItemProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isProjectsPage = location.pathname.toLowerCase() === "/projects";
  const isSelected = searchParams.get("workspace") === String(id);
  const isActive = isProjectsPage && isSelected;

  return (
    <li>
      <Link
        to={`/projects?workspace=${id}`}
        className={clsx(
          `
            flex
            w-full
            items-center
            gap-3
            rounded-[var(--radius-md)]
            px-3
            py-2
            text-left
            text-[var(--color-text-muted)]
            transition-colors
            duration-150
            hover:bg-[var(--color-surface-hover)]
            hover:text-[var(--color-text)]
          `,
          isActive &&
            "bg-[var(--color-surface-active)] text-[var(--color-text)]",
        )}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />

        <span className="truncate">{name}</span>
      </Link>
    </li>
  );
};
