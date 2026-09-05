import {
  ChevronUp,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  getCurrentSession,
  logoutUser,
  subscribeToAuthChanges,
} from "../../../lib/utils/API/auth";

const getGoogleProfile = (session: Session | null) => {
  const metadata = session?.user.user_metadata;
  const fullName = String(
    metadata?.full_name ??
    metadata?.name ??
    [metadata?.given_name, metadata?.family_name].filter(Boolean).join(" ") ??
    "",
  ).trim();
  const avatarUrl = String(metadata?.avatar_url ?? metadata?.picture ?? "");
  const initials = fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return {
    fullName,
    avatarUrl,
    initials: initials || session?.user.email?.charAt(0).toUpperCase() || "U",
  };
};

interface SidebarProfileProps {
  isCollapsed: boolean;
  onExpand: () => void;
}

export const SidebarProfile = ({
  isCollapsed,
  onExpand,
}: SidebarProfileProps) => {
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const closePanel = useCallback(() => setIsOpen(false), []);
  useClickOutside(profileRef, closePanel);

  useEffect(() => {
    let isMounted = true;

    void getCurrentSession()
      .then((currentSession) => {
        if (isMounted) setSession(currentSession);
      })
      .finally(() => {
        if (isMounted) setIsSessionLoading(false);
      });

    const subscription = subscribeToAuthChanges((_event, currentSession) => {
      setSession(currentSession);
      setIsSessionLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const openPage = (path: string) => {
    closePanel();
    navigate(path);
  };

  const handleLogout = async () => {
    setLogoutError(null);

    try {
      await logoutUser();
      closePanel();
      navigate("/login");
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : "Nie udało się wylogować.",
      );
    }
  };

  const googleProfile = getGoogleProfile(session);

  return (
    <div
      ref={profileRef}
      className="relative mt-0 flex flex-col border-b border-[var(--color-border)] p-4 md:mt-auto md:block md:border-t md:border-b-0"
    >
      {isOpen && !isCollapsed ? (
        <div className="order-2 mt-2 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] md:absolute md:bottom-[calc(100%-0.25rem)] md:left-4 md:right-4 md:mt-0 md:z-50">
          {session ? (
            <>
              <div className="border-b border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-surface-hover),var(--color-surface))] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--color-primary)]">
                    <ShieldCheck size={14} /> Aktywna sesja
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_10px_var(--color-success)]" />
                </div>
                <p className="truncate font-semibold text-[var(--color-text)]">
                  {googleProfile.fullName || "Użytkownik AlphaPM"}
                </p>
                <p className="truncate text-xs text-[var(--color-text-muted)]">
                  {session.user.email}
                </p>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                  onClick={() => openPage("/Settings")}
                >
                  <Settings size={17} /> Ustawienia konta
                </button>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm text-[var(--color-danger)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)]"
                  onClick={() => void handleLogout()}
                >
                  <LogOut size={17} /> Wyloguj się
                </button>
                {logoutError ? (
                  <p className="px-3 py-2 text-xs text-[var(--color-danger)]">
                    {logoutError}
                  </p>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-[var(--color-border)] p-4">
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-hover)] text-sm font-semibold text-[var(--color-primary)]">
                    A
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    AlphaPM
                  </span>
                </div>
                <p className="font-semibold text-[var(--color-text)]">
                  Twoja przestrzeń czeka
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                  Zaloguj się, aby synchronizować projekty, zespół i ustawienia.
                </p>
              </div>

              <div className="p-3">
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-3 py-2.5 text-sm font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
                  onClick={() => openPage("/login")}
                >
                  Zaloguj się
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}

      <button
        type="button"
        className={`order-1 group flex w-full cursor-pointer items-center justify-between rounded-[var(--radius-md)] p-2 text-left transition-colors duration-150 hover:bg-[var(--color-surface-hover)] ${isCollapsed ? "md:justify-center" : ""}`}
        aria-expanded={isOpen}
        aria-label="Otwórz panel użytkownika"
        title={isCollapsed ? "Panel użytkownika" : undefined}
        onClick={() => {
          if (isCollapsed) {
            onExpand();
            setIsOpen(true);
            return;
          }

          setIsOpen((current) => !current);
        }}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className={`
            flex 
            h-10 
            w-10 
            shrink-0 
            items-center 
            justify-center 
            overflow-hidden 
            border-1 
            border-[var(--color-primary)] 
            rounded-full 
            bg-[var(--color-background)] 
            text-sm 
            font-semibold 
            hover:border-[var(--color-primary-hover)]
            ${session ? "text-[var(--color-primary-foreground)]" : "text-[var(--color-primary)]"}
           `}
          >
            {isSessionLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : session && googleProfile.avatarUrl ? (
              <img
                className="h-full w-full object-cover"
                src={googleProfile.avatarUrl}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : session ? (
              googleProfile.initials
            ) : (
              <UserRound size={19} />
            )}
          </span>

          <span className={`flex min-w-0 flex-col ${isCollapsed ? "md:hidden" : ""}`}>
            <span className="truncate text-sm font-semibold text-[var(--color-text)]">
              {isSessionLoading
                ? "Sprawdzanie sesji..."
                : session
                  ? googleProfile.fullName || "Użytkownik Google"
                  : "Konto gościa"}
            </span>
            <span className="truncate text-xs text-[var(--color-text-muted)]">
              {session?.user.email ?? "Zaloguj się przez Google"}
            </span>
          </span>
        </span>

        <ChevronUp
          size={17}
          className={`shrink-0 text-[var(--color-text-muted)] transition-transform ${isCollapsed ? "md:hidden" : ""} ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};
