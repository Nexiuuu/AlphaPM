import clsx from "clsx";
import { useId, type SelectHTMLAttributes } from "react";

type SelectbarVariants = "form" | "search" | "hidden";

interface SelectbarProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  className?: string;
  variant?: SelectbarVariants;
  ref?: React.Ref<HTMLSelectElement>;
  hint?: string;
  label?: string;
}

type SelectbarElements = {
  labelStyle: string;
  selectStyle: string;
  hintStyle: string;
};

const baseStyles: SelectbarElements = {
  labelStyle: "",
  selectStyle: `
    text-[var(--color-text)]
    w-full bg-transparent
    focus:outline-none text-sm
    transition-opacity duration-200
    opacity-100 delay-100
  `,
  hintStyle: "",
};

const SelectbarStylesVariants: Record<SelectbarVariants, SelectbarElements> = {
  form: {
    labelStyle: `w-4/5 h-20 px-2 mx-2 
      rounded-[var(--radius-md)]
      bg-[var(--color-surface)]
      border-1 border-[var(--color-background)]
      outline-2 outline-offset-2 outline-[var(--color-primary-hover)]`,
    selectStyle: "",
    hintStyle: "",
  },

  search: {
    labelStyle: "w-full",
    selectStyle: "",
    hintStyle: "",
  },

  hidden: {
    labelStyle: `opacity-0 delay-100`,
    selectStyle: "",
    hintStyle: "",
  },
};

export const Selectbar = ({
  name,
  className,
  variant = "form",
  label,
  hint,
  ref,
  children,
  ...selectProps
}: SelectbarProps) => {
  const generatedId = useId();
  const selectId = name ?? generatedId;

  const styles = SelectbarStylesVariants[variant];

  return (
    <label
      className={clsx(baseStyles.labelStyle, styles.labelStyle, className)}
    >
      {label}

      <select
        className={clsx(baseStyles.selectStyle, styles.selectStyle)}
        ref={ref}
        id={selectId}
        name={name}
        {...selectProps}
      >
        {children}
      </select>

      {hint ? (
        <span className={clsx(baseStyles.hintStyle, styles.hintStyle)}>
          {hint}
        </span>
      ) : null}
    </label>
  );
};
