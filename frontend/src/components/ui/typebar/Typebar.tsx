import clsx from "clsx";
import { useId, type InputHTMLAttributes } from "react";

type TypebarVariants = "search" | "form" | "hidden";

interface TypebarProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  className?: string;
  variant?: TypebarVariants;
  ref?: React.Ref<HTMLInputElement>;
  hint?: string;
  label?: string;
}

type TypebarElements = {
  labelStyle: string;
  inputStyle: string;
  hintStyle: string;
};

const baseStyles: TypebarElements = {
  labelStyle: "",
  inputStyle: `
                        w-full bg-transparent text-neutral-200 placeholder-neutral-500 focus:outline-none text-sm
                        transition-opacity duration-200
                        opacity-100 delay-100
                    `,
  hintStyle: "",
};

const TypebarStylesVariants: Record<TypebarVariants, TypebarElements> = {
  form: {
    labelStyle: ``,
    inputStyle: "",
    hintStyle: "",
  },
  search: {
    labelStyle: "w-full",
    inputStyle: "",
    hintStyle: "",
  },
  hidden: {
    labelStyle: `opacity-0 delay-100`,
    inputStyle: "",
    hintStyle: "",
  },
};

export const Typebar = ({
  name,
  className,
  variant = "form",
  label,
  hint,
  ref,
  ...inputProps
}: TypebarProps) => {
  const generatedId = useId();
  const inputId = name ? name : generatedId;
  const styles = TypebarStylesVariants[variant];

  return (
    <label
      className={clsx(
        baseStyles["labelStyle"],
        styles["labelStyle"],
        className,
      )}
    >
      {label}
      <input
        className={clsx(baseStyles["inputStyle"], styles["inputStyle"])}
        ref={ref}
        id={inputId}
        name={name}
        {...inputProps}
      />
      {hint ? (
        <span className={clsx(baseStyles["hintStyle"], styles["hintStyle"])}>
          {hint}
        </span>
      ) : null}
    </label>
  );
};
