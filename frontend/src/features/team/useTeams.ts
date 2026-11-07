import { useCallback, useEffect, useRef, useState } from "react";

import { useAuth } from "../auth/useAuth";
import { createTeamRequest, getTeamsRequest } from "./api/teams";
import type { CreateTeamInput, Team } from "./types";

export const useTeams = () => {
  const { session, isLoading: isAuthLoading } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);
  const isAuthenticated = Boolean(session);

  const loadTeams = useCallback(async () => {
    const currentRequestId = ++requestId.current;
    setError(null);

    if (!isAuthenticated) {
      setTeams([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const loadedTeams = await getTeamsRequest();
      if (currentRequestId === requestId.current) setTeams(loadedTeams);
    } catch (caughtError) {
      if (currentRequestId === requestId.current) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Failed to load teams.",
        );
      }
    } finally {
      if (currentRequestId === requestId.current) setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthLoading) return;

    let isActive = true;
    queueMicrotask(() => {
      if (isActive) void loadTeams();
    });

    return () => {
      isActive = false;
      requestId.current += 1;
    };
  }, [isAuthLoading, loadTeams]);

  const createTeam = async (input: CreateTeamInput) => {
    const newTeam = await createTeamRequest(input);
    setTeams((currentTeams) => [newTeam, ...currentTeams]);
    return newTeam;
  };

  return {
    teams,
    isLoading: isAuthLoading || isLoading,
    isAuthenticated,
    error,
    createTeam,
    reloadTeams: loadTeams,
  };
};
