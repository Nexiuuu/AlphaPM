import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({
  children,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={clsx(
        `
          rounded-[var(--radius-md)]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
        `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};