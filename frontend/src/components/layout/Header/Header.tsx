import { usePageTitle } from "../../../hooks/usePageTitle";

import { HeaderActions } from "./HeaderActions";

export const Header = () => {
  const title = usePageTitle();

  return (
    <header
      className="
        flex
        h-[var(--header-height)]
        items-center
        justify-between
        border-b
        border-[var(--color-border)]
        px-4
        sm:px-6
      "
    >
      <h1
        className="
          min-w-0
          truncate
          text-lg
          font-semibold
          text-[var(--color-text)]
        "
      >
        {title}
      </h1>

      <HeaderActions />
    </header>
  );
};
