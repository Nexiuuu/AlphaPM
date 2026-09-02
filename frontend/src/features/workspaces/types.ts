export interface Workspace {
  id: number;
  owner_id: string | null;
  name: string;
  color: string;
  created_at: string;
}

export interface CreateWorkspaceInput {
  name: string;
  color: string;
}
