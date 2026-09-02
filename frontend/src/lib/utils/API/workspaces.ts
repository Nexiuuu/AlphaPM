import type {
  CreateWorkspaceInput,
  Workspace,
} from "../../../features/workspaces/types";
import { supabase } from "./supabase";

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const { data, error } = await supabase.rpc("get_projects");
  if (error) {
    throw error;
  }

  return (data ?? []) as Workspace[];
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
