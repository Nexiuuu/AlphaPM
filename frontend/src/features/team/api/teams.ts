import { getAuthenticatedSession } from "../../../lib/auth/getAuthenticatedSession";
import { apiFetch } from "../../../lib/utils/API/apiFetch";
import type { CreateTeamInput, Team } from "../types";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getTeamsRequest = async (): Promise<Team[]> => {
  const session = await getAuthenticatedSession();
  const response = await apiFetch(
    `${API_URL}/api/teams`,
    { method: "GET" },
    session.access_token,
  );

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return response.json();
};

export const createTeamRequest = async (
  input: CreateTeamInput,
): Promise<Team> => {
  const session = await getAuthenticatedSession();
  const response = await apiFetch(
    `${API_URL}/api/teams`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    session.access_token,
  );

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return response.json();
};
