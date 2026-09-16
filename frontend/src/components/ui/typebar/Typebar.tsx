import clsx from "clsx";
import { useId, type InputHTMLAttributes, type Ref } from "react";

type TypebarVariant = "search" | "form" | "hidden";

interface TypebarProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: TypebarVariant;
  ref?: Ref<HTMLInputElement>;
  hint?: string;
  label?: string;
}

interface TypebarStyles {
  container: string;
  input: string;
  label: string;
  hint: string;
}

const styles: Record<TypebarVariant, TypebarStyles> = {
  form: {
    container: "relative block w-full",
    input: `
      peer
      block
      h-12
      w-full
      rounded-lg
      border
      border-[var(--color-border)]
      bg-[var(--color-surface)]
      px-5
      pb-1
      pt-5
      text-sm
      text-[var(--color-text)]
      outline-none
      transition-colors
      focus:border-[var(--color-primary)]
    `,
    label: `
      pointer-events-none
      absolute
      left-3
      top-2
      origin-[0]
      scale-75
      select-none
      text-sm
      text-[var(--color-text-muted)]
      transition-all
      duration-200
      peer-placeholder-shown:top-1/2
      peer-placeholder-shown:-translate-y-1/2
      peer-placeholder-shown:scale-100
      peer-focus:top-0
      peer-focus:left-5
      peer-focus:translate-y-0
      peer-focus:scale-75
      peer-focus:text-[var(--color-primary)]
    `,
    hint: "mt-1 block text-xs text-[var(--color-text-muted)]",
  },
  search: {
    container: "block w-full",
    input: `
      w-full
      bg-transparent
      text-sm
      text-[var(--color-text)]
      placeholder:text-[var(--color-text-muted)]
      focus:outline-none
    `,
    label: "sr-only",
    hint: "sr-only",
  },
  hidden: {
    container: "block w-full opacity-0 transition-opacity duration-200",
    input: `
      w-full
      bg-transparent
      text-sm
      text-[var(--color-text)]
      placeholder:text-[var(--color-text-muted)]
      focus:outline-none
    `,
    label: "sr-only",
    hint: "sr-only",
  },
};

export const Typebar = ({
  id,
  name,
  className,
  variant = "form",
  label,
  hint,
  ref,
  ...inputProps
}: TypebarProps) => {
  const generatedId = useId();
  const inputId = id ?? name ?? generatedId;
  const variantStyles = styles[variant];

  return (
    <label className={clsx(variantStyles.container, className)}>
      <input
        autoComplete="off"
        ref={ref}
        id={inputId}
        name={name}
        className={variantStyles.input}
        {...inputProps}
      />

      {label && (
        <span className={variantStyles.label}>
          {label}
        </span>
      )}

      {hint && (
        <span className={variantStyles.hint}>
          {hint}
        </span>
      )}
    </label>
  );
};
