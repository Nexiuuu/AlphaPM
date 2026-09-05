import clsx from "clsx";
import { useId, useRef, type SelectHTMLAttributes } from "react";

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
  outerStyle: string;
  labelStyle: string;
  selectStyle: string;
  hintStyle: string;
};

const baseStyles: SelectbarElements = {
  outerStyle: "",
  labelStyle: "",
  selectStyle: `
    text-[var(--color-text)]
    bg-transparent
    text-sm
    transition-opacity duration-200
    opacity-100 delay-100
  `,
  hintStyle: "",
};

const SelectbarStylesVariants: Record<SelectbarVariants, SelectbarElements> = {
  form: {
    outerStyle: `w-4/5 p-[2.15px]
      rounded-[calc(var(--radius-md)+var(--spacing))]
      transition-all duration-200
      bg-[var(--color-surface)]
      hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary-hover)_30%,transparent)]
      `,
    labelStyle: `
      w-full
      [-webkit-text-stroke:0px]
      items-center
      justify-center
      flex
      gap-3
      `,
    selectStyle: `w-full h-full 
      p-[calc(var(--spacing)/2)]
      block
      [-webkit-text-stroke:6px_var(--color-surface)]
      [paint-order:stroke_fill]
      rounded-[var(--radius-md)]
      outline-2 outline-offset outline-[var(--color-primary)]
      transition-all duration-200
      border-3
      border-[var(--color-surface-grid)]
      
      hover:outline-[var(--color-primary-hover)]
      `,
    hintStyle: "",
  },

  search: {
    outerStyle: "",
    labelStyle: "",
    selectStyle: "",
    hintStyle: "",
  },

  hidden: {
    outerStyle: "",
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
  const sRef = useRef<HTMLSelectElement>(null);

  const setSelectRef = (element: HTMLSelectElement | null) => {
    sRef.current = element;

    if (typeof ref == "function") ref(element);
    else if (ref) {
      ref.current = element;
    }
  };

  const styles = SelectbarStylesVariants[variant];

  return (
    <label className={clsx(baseStyles.labelStyle, styles.labelStyle)}>
      {label}

      <div
        className={clsx(baseStyles.outerStyle, styles.outerStyle, className)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          sRef.current?.showPicker();
        }}
      >
        <select
          className={clsx(baseStyles.selectStyle, styles.selectStyle)}
          ref={setSelectRef}
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
      </div>
    </label>
  );
};
