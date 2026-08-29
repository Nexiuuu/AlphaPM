import { useState } from "react";
import { Link } from "react-router-dom";

import { loginWithGoogle } from "../lib/utils/API/auth";

export const LoginPage = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoginError(null);
    setIsRedirecting(true);

    try {
      await loginWithGoogle();
    } catch (error) {
      setIsRedirecting(false);
      setLoginError(
        error instanceof Error
          ? error.message
          : "Nie udało się rozpocząć logowania przez Google.",
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-10 text-[var(--color-text)]">
      <section className="w-full max-w-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[var(--shadow-md)]">
        <Link className="mb-8 inline-flex items-center gap-2" to="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary)] font-bold text-[var(--color-primary-foreground)]">
            A
          </span>
          <span className="font-semibold">AlphaPM</span>
        </Link>

        <h1 className="text-2xl font-semibold">Zaloguj się</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
          Użyj konta Google. Przy pierwszym logowaniu konto AlphaPM zostanie
          utworzone automatycznie.
        </p>

        <button
          type="button"
          className="mt-7 flex w-full cursor-pointer items-center justify-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 disabled:cursor-wait disabled:opacity-60"
          disabled={isRedirecting}
          onClick={() => void handleGoogleLogin()}
        >
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 font-semibold text-blue-600"
          >
            G
          </span>
          {isRedirecting ? "Przekierowywanie..." : "Kontynuuj z Google"}
        </button>

        {loginError ? (
          <p
            role="alert"
            className="mt-4 text-sm text-[var(--color-danger)]"
          >
            {loginError}
          </p>
        ) : null}

        <p className="mt-6 border-t border-[var(--color-border)] pt-5 text-center text-xs leading-5 text-[var(--color-text-muted)]">
          Logując się, akceptujesz zasady korzystania z AlphaPM.
        </p>
      </section>
    </main>
  );
};
