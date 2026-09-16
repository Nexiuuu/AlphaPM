import { Plus } from "lucide-react";

import { Link } from "react-router-dom";

export const HeaderNewProject = () => {
  return (
    <Link
      to={"/projects/new"}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-[var(--radius-md)]
        px-4
        py-2
        text-sm
        font-medium
        transition-colors
        duration-150
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-primary)]
        disabled:pointer-events-none
        disabled:opacity-50
        cursor-pointer
        bg-[var(--color-primary)]
        text-black
        hover:bg-[var(--color-primary-hover)]
      "
    >
      <Plus size={18} />
      <span className="hidden sm:inline">New Project</span>
    </Link>
  );
};
