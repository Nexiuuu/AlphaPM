interface WorkspaceItemProps {
  id: string;
  name: string;
  color: string;
}

export const SidebarWsItem = ({
  name,
  color,
}: WorkspaceItemProps) => {
  return (
    <li>
      <button
        type="button"
        className="
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
        "
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />

        <span>{name}</span>
      </button>
    </li>
  );
};
