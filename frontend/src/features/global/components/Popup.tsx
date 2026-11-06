import clsx from "clsx";
import { useEffect, type PropsWithChildren } from "react";

export const Popup = ({
  labeledBy,
  className: cn,
  children,
  onClose,
}: PropsWithChildren<{
  labeledBy: string;
  className?: string;
  onClose: () => void;
}>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
        cn,
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={labeledBy}
        className="
          max-h-[calc(100dvh-2rem)] 
          w-full max-w-md 
          overflow-y-auto 
          rounded-xl 
          border border-[var(--color-border)] 
          bg-[var(--color-surface)] 
          shadow-2xl"
      >
        {children}
      </section>
    </div>
  );
};
