export const SidebarLogo = () => {
  return (
    <div
      className="
        border-b
        border-[var(--color-border)]
        px-6
        py-5
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-[var(--radius-md)]
            bg-[var(--color-primary)]
            font-bold
            text-[var(--color-primary-foreground)]
          "
        >
          A
        </div>

        <div>
          <h1 className="font-semibold text-[var(--color-text)]">
            AlphaPM
          </h1>

          <p className="text-sm text-[var(--color-text-muted)]">
            Project Management
          </p>
        </div>
      </div>
    </div>
  );
};