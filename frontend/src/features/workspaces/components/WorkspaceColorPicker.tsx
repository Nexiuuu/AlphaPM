import type { UseFormRegisterReturn } from "react-hook-form";

interface WorkspaceColorPickerProps {
  id: string;
  color: string;
  registration: UseFormRegisterReturn;
  description: string;
}

export const WorkspaceColorPicker = ({
  id,
  color,
  registration,
  description,
}: WorkspaceColorPickerProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-transform hover:scale-105">
        <span
          className="h-8 w-8 rounded-full border border-black/10 shadow-inner"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <input
          id={id}
          type="color"
          aria-label="Wybierz kolor projektu"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          {...registration}
        />
      </div>

      <label
        htmlFor={id}
        className="flex min-w-0 cursor-pointer flex-col gap-0.5"
      >
        <span className="text-sm font-medium text-[var(--color-text)]">
          {description}
        </span>
        <span className="font-mono text-xs uppercase text-[var(--color-text-muted)]">
          {color}
        </span>
      </label>
    </div>
  );
};
