import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        flex
        min-h-[calc(100vh-var(--header-height))]
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-xl
          rounded-[var(--radius-lg)]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          p-8
          text-center
          shadow-[var(--shadow-md)]
          sm:p-12
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[var(--color-primary)]/10
            text-[var(--color-primary)]
          "
        >
          <SearchX size={32} />
        </div>

        <p
          className="
            mt-6
            text-7xl
            font-black
            tracking-tight
            text-[var(--color-primary)]
          "
        >
          404
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Ta strona poszła na daily i nie wróciła.
        </h2>

        <p
          className="
            mx-auto
            mt-3
            max-w-md
            text-sm
            leading-6
            text-[var(--color-text-muted)]
          "
        >
          Sprawdziliśmy backlog, tablicę i nawet kosz. Tego adresu naprawdę
          tutaj nie ma.
        </p>

        <div
          className="
            mt-8
            flex
            flex-col
            justify-center
            gap-3
            sm:flex-row
          "
        >
          <Link
            to="/"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-[var(--radius-sm)]
              bg-[var(--color-primary)]
              px-5
              py-3
              text-sm
              font-semibold
              text-[var(--color-primary-foreground)]
              transition-colors
              hover:bg-[var(--color-primary-hover)]
            "
          >
            <Home size={17} />
            Wracam do Dashboardu
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-[var(--radius-sm)]
              border
              border-[var(--color-border)]
              px-5
              py-3
              text-sm
              font-medium
              transition-colors
              hover:bg-[var(--color-surface-hover)]
            "
          >
            <ArrowLeft size={17} />
            Cofnij mnie, zanim ktoś zauważy
          </button>
        </div>
      </div>
    </section>
  );
};
