export interface Workspace {
  id: number;
  owner_id: string | null;
  name: string;
  color: string;
  createdAt: string;
}

export interface CreateWorkspaceInput {
  name: string;
  color: string;
}

export interface UpdateWorkspaceInput {
  name: string;
  color: string;
}