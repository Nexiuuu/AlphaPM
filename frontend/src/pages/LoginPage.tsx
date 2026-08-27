import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button/Button";
import { loginUser } from "../lib/utils/API/auth";

type LoginFormData = {
  email: string;
  password: string;
};

const inputClassName = `
  w-full rounded-[var(--radius-sm)] border border-[var(--color-border)]
  bg-[var(--color-background)] px-3 py-2 text-[var(--color-text)]
  outline-none transition-colors placeholder:text-[var(--color-text-disabled)]
  focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-ring)]
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (formData: LoginFormData) => {
    setSubmitError(null);

    try {
      await loginUser(formData);
      navigate("/");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nie udało się zalogować. Spróbuj ponownie.",
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-10">
      <section className="w-full max-w-md rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] font-bold text-[var(--color-primary-foreground)]">
            A
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">
              Witaj ponownie
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Zaloguj się do swojej przestrzeni AlphaPM.
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="block text-sm text-[var(--color-text-secondary)]">
            Adres e-mail
            <input
              className={inputClassName}
              type="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "Adres e-mail jest wymagany.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Podaj prawidłowy adres e-mail.",
                },
              })}
            />
            {errors.email ? (
              <span className="mt-1 block text-xs text-[var(--color-danger)]">
                {errors.email.message}
              </span>
            ) : null}
          </label>

          <label className="block text-sm text-[var(--color-text-secondary)]">
            Hasło
            <input
              className={inputClassName}
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Hasło jest wymagane.",
              })}
            />
            {errors.password ? (
              <span className="mt-1 block text-xs text-[var(--color-danger)]">
                {errors.password.message}
              </span>
            ) : null}
          </label>

          {submitError ? (
            <p role="alert" className="text-sm text-[var(--color-danger)]">
              {submitError}
            </p>
          ) : null}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
          Nie masz jeszcze konta?{" "}
          <Link
            className="font-medium text-[var(--color-primary)] hover:underline"
            to="/register"
          >
            Zarejestruj się
          </Link>
        </p>
      </section>
    </main>
  );
};
