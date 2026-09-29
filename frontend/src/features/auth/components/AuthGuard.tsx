import { Outlet } from "react-router-dom";

import { LoadingText } from "../../../components/ui/LoadingText/LoadingText";
import { GuestSessionNotice } from "./GuestSessionNotice";
import { useAuth } from "../useAuth";

export const AuthGuard = () => {
    const { isLoading, session } = useAuth();

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] text-[var(--color-text-muted)]">
                <LoadingText label="Sprawdzanie sesji" />
            </main>
        );
    }

    return (
        <>
            {!session && <GuestSessionNotice />}
            <Outlet />
        </>
    );
};
