import {
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Session } from "@supabase/supabase-js";

import {
  getCurrentSession,
  subscribeToAuthChanges,
} from "../../lib/utils/API/auth";
import { AuthContext } from "./authStore";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let authChangeCount = 0;

    const subscription = subscribeToAuthChanges((_event, nextSession) => {
      authChangeCount += 1;
      setSession(nextSession);
      setIsLoading(false);
    });

    const initialAuthChangeCount = authChangeCount;

    getCurrentSession()
      .then((currentSession) => {
        if (!isMounted || authChangeCount !== initialAuthChangeCount) return;

        setSession(currentSession);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted || authChangeCount !== initialAuthChangeCount) return;

        setSession(null);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
