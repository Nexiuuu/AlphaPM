import { Plus } from "lucide-react"

export const HeaderNewProject = () => {
  return (
    <button
      type="button"
      className="
        flex
        items-center
        gap-2
        rounded-[var(--radius-md)]
        bg-[var(--color-primary)]
        px-4
        py-2
        text-sm
        font-medium
        text-black
        transition-colors
        duration-150
        hover:bg-[var(--color-primary-hover)]
        cursor-pointer
        active:bg-black
      "
    >
      <Plus size={18} />
      New Project
    </button>
  );
};