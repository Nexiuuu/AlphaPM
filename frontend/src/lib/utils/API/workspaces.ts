import type {
  CreateWorkspaceInput,
  Workspace,
} from "../../../features/workspaces/types";
import { supabase } from "./supabase";

export const getWorkspaces = async (): Promise<Workspace[]> => {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    const { data, error } = await supabase.rpc("get_projects");

    if (!error) {
      return (data ?? []) as Workspace[];
    }

    lastError = error;

    if (attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  throw lastError;
};

export const createWorkspace = async (
  input: CreateWorkspaceInput,
): Promise<Workspace> => {
  const { data, error } = await supabase.rpc("create_project", {
    p_name: input.name,
    p_color: input.color,
  });
  if (error) {
    throw error;
  }

  return data as Workspace;
};
