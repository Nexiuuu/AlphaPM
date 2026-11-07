export interface TeamProject {
  id: string;
  name: string;
  color: string;
}

export interface Team {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  createdAt: string;
  memberCount: number;
  projects: TeamProject[];
}

export interface CreateTeamInput {
  name: string;
  description: string;
  projectIds: string[];
}
