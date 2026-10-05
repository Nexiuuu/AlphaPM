import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";

interface WorkspaceColorPickerProps {
  id: string;
  value: string;
  onChange: (color: string) => void;
  description: string;
}

export const WorkspaceColorPicker = ({
  id,
  value,
  onChange,
  description,
}: WorkspaceColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentColor = value || "#27f580";
  const [tempColor, setTempColor] = useState(currentColor);
  const { t } = useTranslation("common");

  const handleOpen = () => {
    setTempColor(currentColor);
    setIsOpen(true);
  };

  const handleAccept = () => {
    onChange(tempColor);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center gap-3">
      <button
        id={id}
        type="button"
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="
          relative 
          grid 
          h-12 
          w-12 
          shrink-0 
          place-items-center 
          rounded-full 
          border 
          border-[var(--color-border)] 
          bg-[var(--color-surface)] 
          shadow-sm 
          transition-transform 
          hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]
          cursor-pointer
        "
      >
        <span
          className="h-8 w-8 rounded-full border border-black/10 shadow-inner"
          style={{ backgroundColor: currentColor }}
          aria-hidden="true"
        />
      </button>

      <label
        htmlFor={id}
        onClick={handleOpen}
        className="flex min-w-0 cursor-pointer flex-col gap-0.5"
      >
        <span className="text-sm font-medium text-[var(--color-text)]">
          {description}
        </span>
        <span className="font-mono text-xs uppercase text-[var(--color-text-muted)]">
          {currentColor}
        </span>
      </label>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={handleCancel}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Wybierz kolor"
            className="
              absolute 
              left-0 
              top-14 
              z-50 
              flex 
              flex-col 
              gap-3 
              rounded-xl 
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)] 
              p-4 
              shadow-xl
            "
          >
            <HexColorPicker color={tempColor} onChange={setTempColor} />

            <div className="flex items-center gap-2 pt-1">
              <span
                className="h-6 w-6 rounded-full border border-black/10 shadow-inner"
                style={{ backgroundColor: tempColor }}
              />
              <span className="font-mono text-xs uppercase text-[var(--color-text)]">
                {tempColor}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={handleCancel}
                className="
                  px-2.5
                  py-1.5  
                  text-xs 
                  font-semibold 
                  text-[var(--color-text)]
                  rounded-md 
                  border 
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]
                  cursor-pointer
                  transition-colors
                  hover:opacity-65
                  focus:outline-none
                "
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="
                  px-2.5
                  py-1.5 
                  text-xs 
                  font-medium 
                  rounded-md 
                  cursor-pointer
                  bg-[var(--color-primary)]
                  text-[var(--color-primary-foreground)] 
                  hover:opacity-65
                  transition-opacity
                  hover:border-[var(--color-primary-hover)]
                  focus:outline-none
                "
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
