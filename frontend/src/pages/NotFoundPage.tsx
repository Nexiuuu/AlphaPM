import { ArrowLeft, Home, X, Search, HatGlasses } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFlow } from "../hooks/animations/useFlow";

const headers = [
  "Specjalizujemy się w planowaniu, ale tej strony akurat nie zaplanowaliśmy.",
  "Prześledziliśmy wszystko i znaleźliśmy... nic.",
  "Strona... zniknąła albo jej nigdy nie było.",
  "Ta strona wypadła z planu.",
  "Ta strona chyba uciekła.",
  'Puk, puk. \n"Kto tam?" \nNa pewno nie ta strona.',
];

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { trigger, finish } = useFlow();

  const [header] = useState(
    () => headers[Math.floor(Math.random() * headers.length)],
  );

  useEffect(() => {
    trigger();

    return () => {
      finish();
    };
  }, [trigger, finish]);

  return (
    <section className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-md)] sm:p-12">
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-[var(--color-primary)]/25 text-[var(--color-primary)]">
          <div className="not-found-icon relative -left-1.5 -top-1.5 scale-120">
            <HatGlasses size={72} className="relative" />

            <div className="search-lenses absolute top-0 text-[var(--color-surface-grid)]">
              <X
                className="search-x absolute left-0.75 top-0.75 scale-75 text-red-500"
                strokeWidth={4}
              />

              <Search
                size={32}
                className="search-lens absolute left-0 top-0"
                strokeWidth={3.5}
              />
            </div>
          </div>
        </div>

        <p className="mt-6 text-7xl font-black tracking-tight text-[var(--color-primary)] select-none">
          404
        </p>

        <div className="mt-3 flex min-h-39 flex-col items-center justify-center">
          <h2 className="whitespace-pre-line text-2xl font-semibold">
            {header}
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--color-text-muted)]">
            Sprawdziliśmy backlog, tablicę i nawet kosz. Tego adresu naprawdę
            tutaj nie ma.
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
          >
            <Home size={17} />
            Wracam do Dashboardu
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-5 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-surface-hover)]"
          >
            <ArrowLeft size={17} />
            Cofnij mnie, zanim ktoś zauważy
          </button>
        </div>
      </div>
    </section>
  );
};
