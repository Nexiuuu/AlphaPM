export const SidebarProfile = () => {
  return (
    <div
      className="
        mt-auto
        border-t
        border-[var(--color-border)]
        p-4
        cursor-pointer
      "
    >
      <div
        className="
          group
          flex
          items-center
          justify-between
          rounded-[var(--radius-md)]
          p-2
          transition-colors
          duration-150
          hover:bg-[var(--color-surface-hover)]
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--color-primary)]
              text-sm
              font-semibold
              text-black
            "
          >
            IN
          </div>

          <div className="flex min-w-0 flex-col">
            <span
              className="
                truncate
                text-sm
                font-semibold
                text-[var(--color-text)]
              "
            >
              Imie Nazwisko
            </span>

            <span
              className="
                truncate
                text-xs
                text-[var(--color-text-muted)]
              "
            >
              Test
            </span>
          </div>
        </div>

        <button
          type="button"
          className="
            rounded-lg
            p-1.5
            text-[var(--color-text-muted)]
            opacity-0
            transition-all
            duration-150
            group-hover:opacity-100
            hover:bg-[var(--color-surface-hover)]
            hover:text-[var(--color-text)]
            cursor-pointer
          "
          aria-label="Open profile menu"
        >
          ...
        </button>
      </div>
    </div>
  );
};