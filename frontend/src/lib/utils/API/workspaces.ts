import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  Workspace,
} from "../../../features/workspaces/types";
import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_URL}/api/projects`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workspaces: ${response.status}`);
  }

  return response.json();
};

export const createWorkspace = async (
  input: CreateWorkspaceInput,
): Promise<Workspace> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      name: input.name,
      color: input.color,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create workspace: ${response.status}`);
  }

  return response.json();
};

export const updateWorkspace = async (
  projectId: number,
  input: UpdateWorkspaceInput,
): Promise<Workspace> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      name: input.name,
      color: input.color,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update workspace: ${response.status}`);
  }

  return response.json();
};

export const deleteWorkspace = async (
  projectId: number
): Promise<void> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete workspace: ${response.status}`);
  }
};