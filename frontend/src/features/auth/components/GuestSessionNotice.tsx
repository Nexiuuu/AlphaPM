import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export const GuestSessionNotice = () => (
  <aside className="flex flex-col gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <p className="text-[var(--color-text-muted)]">
      <span className="mr-2 rounded-full bg-[var(--color-primary)]/10 px-2 py-1 text-xs font-semibold text-[var(--color-primary)]">
        Tryb podglądu
      </span>
      Zaloguj się, aby korzystać ze swoich projektów i danych.
    </p>
    <Link
      to="/login"
      className="inline-flex w-fit items-center gap-1.5 font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] focus:outline-none focus-visible:underline"
    >
      <LogIn size={15} />
      Zaloguj się
    </Link>
  </aside>
);
