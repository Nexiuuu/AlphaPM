import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button/Button";
import { registerUser } from "../lib/utils/API/auth";

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const inputClassName = `
  w-full rounded-[var(--radius-sm)] border border-[var(--color-border)]
  bg-[var(--color-background)] px-3 py-2 text-[var(--color-text)]
  outline-none transition-colors placeholder:text-[var(--color-text-disabled)]
  focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-ring)]
`;

export const RegisterPage = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (formData: RegisterFormData) => {
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const data = await registerUser(formData);

      setSuccessMessage(
        data.session
          ? "Konto zostało utworzone."
          : "Konto zostało utworzone. Sprawdź skrzynkę e-mail i potwierdź rejestrację.",
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nie udało się utworzyć konta. Spróbuj ponownie.",
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-10">
      <section className="w-full max-w-md rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">
            Utwórz konto
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Wprowadź swoje dane, aby rozpocząć korzystanie z aplikacji.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[var(--color-text-secondary)]">
              Imię
              <input
                className={inputClassName}
                autoComplete="given-name"
                {...register("firstName", {
                  required: "Imię jest wymagane.",
                  maxLength: {
                    value: 80,
                    message: "Imię może mieć maksymalnie 80 znaków.",
                  },
                })}
              />
              {errors.firstName ? (
                <span className="mt-1 block text-xs text-[var(--color-danger)]">
                  {errors.firstName.message}
                </span>
              ) : null}
            </label>

            <label className="text-sm text-[var(--color-text-secondary)]">
              Nazwisko
              <input
                className={inputClassName}
                autoComplete="family-name"
                {...register("lastName", {
                  required: "Nazwisko jest wymagane.",
                  maxLength: {
                    value: 80,
                    message: "Nazwisko może mieć maksymalnie 80 znaków.",
                  },
                })}
              />
              {errors.lastName ? (
                <span className="mt-1 block text-xs text-[var(--color-danger)]">
                  {errors.lastName.message}
                </span>
              ) : null}
            </label>
          </div>

          <label className="block text-sm text-[var(--color-text-secondary)]">
            Adres e-mail
            <input
              className={inputClassName}
              type="email"
              autoComplete="email"
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
              autoComplete="new-password"
              {...register("password", {
                required: "Hasło jest wymagane.",
                minLength: {
                  value: 8,
                  message: "Hasło musi mieć co najmniej 8 znaków.",
                },
              })}
            />
            {errors.password ? (
              <span className="mt-1 block text-xs text-[var(--color-danger)]">
                {errors.password.message}
              </span>
            ) : null}
          </label>

          <label className="block text-sm text-[var(--color-text-secondary)]">
            Powtórz hasło
            <input
              className={inputClassName}
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Powtórz hasło.",
                validate: (value) =>
                  value === getValues("password") || "Hasła nie są takie same.",
              })}
            />
            {errors.confirmPassword ? (
              <span className="mt-1 block text-xs text-[var(--color-danger)]">
                {errors.confirmPassword.message}
              </span>
            ) : null}
          </label>

          {submitError ? (
            <p role="alert" className="text-sm text-[var(--color-danger)]">
              {submitError}
            </p>
          ) : null}

          {successMessage ? (
            <p role="status" className="text-sm text-[var(--color-success)]">
              {successMessage}
            </p>
          ) : null}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Tworzenie konta..." : "Zarejestruj się"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
          Masz już konto?{" "}
          <Link
            className="font-medium text-[var(--color-primary)] hover:underline"
            to="/login"
          >
            Zaloguj się
          </Link>
        </p>
      </section>
    </main>
  );
};
