import type { ReactNode } from "react";

import { useAuth } from "../useAuth";

interface AuthenticatedContentProps {
  children: ReactNode;
  fallback?: ReactNode;
  showChildrenToGuests?: boolean;
}

export const AuthenticatedContent = ({
  children,
  fallback = null,
  showChildrenToGuests = false,
}: AuthenticatedContentProps) => {
  const { session } = useAuth();

  if (session) return children;

  return (
    <>
      {fallback}
      {showChildrenToGuests && children}
    </>
  );
};
