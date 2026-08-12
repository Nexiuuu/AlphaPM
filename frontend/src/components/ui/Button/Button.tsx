import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = `
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
  `;

  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-[var(--color-primary)]
      text-black
      hover:bg-[var(--color-primary-hover)]
    `,

    secondary: `
      border
      border-[var(--color-border)]
      bg-[var(--color-surface)]
      text-[var(--color-text)]
      hover:bg-[var(--color-surface-hover)]
    `,

    ghost: `
      text-[var(--color-text-muted)]
      hover:bg-[var(--color-surface-hover)]
      hover:text-[var(--color-text)]
    `,
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};