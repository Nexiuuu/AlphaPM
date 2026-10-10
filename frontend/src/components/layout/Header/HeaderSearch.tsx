import { Search, X } from "lucide-react";
import { useState, useRef, type ChangeEvent } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { Typebar } from "../../ui/typebar/Typebar";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("header");
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as { from?: unknown } | null;
  const previousPath =
    typeof locationState?.from === "string" ? locationState.from : "/";
  const isSearchPage = location.pathname.toLowerCase().endsWith("/search");

  useClickOutside(searchRef, () => setIsOpen(false));

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value.trim();

    if (!query) {
      if (isSearchPage) {
        navigate(previousPath, { replace: true });
      }

      return;
    }

    const from = isSearchPage
      ? previousPath
      : `${location.pathname}${location.search}${location.hash}`;

    navigate(`/search?q=${encodeURIComponent(query)}`, {
      replace: true,
      state: { from },
    });
  };

  return (
    <div className="flex items-center justify-end relative">
      <div
        ref={searchRef}
        className={`
          flex 
          items-center 
          h-10 
          bg-[var(--color-surface)] 
          border 
          border-[var(--color-border)] 
          rounded-full 
          overflow-hidden
          transition-all 
          duration-300 
          ease-in-out
          ${isOpen ? "w-[min(20rem,calc(100vw-8rem))] px-4" : "w-10 px-0 border-transparent bg-transparent"}
        `}
      >
        <Typebar
          type="text"
          placeholder={t("search")}
          autoFocus={isOpen}
          variant={isOpen ? "search" : "hidden"}
          onChange={handleSearchChange}
        />

        {isOpen ? (
          <button
            onClick={() => setIsOpen(false)}
            className="
              cursor-pointer 
              text-neutral-400 
              hover:text-neutral-200 
              ml-2 
              shrink-0
            "
            aria-label={t("aria.openSearch")}
          >
            <X size={18} />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="
              cursor-pointer 
              text-neutral-400 
              hover:text-[var(--color-text)] 
              p-2 
              rounded-full 
              hover:bg-neutral-800 
              shrink-0 
              absolute 
              right-0
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-primary)]
            "

            aria-label={t("aria.closeSearch")}
          >
            <Search size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
