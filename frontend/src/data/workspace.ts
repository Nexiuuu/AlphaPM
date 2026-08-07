export interface Workspace {
  id: string;
  name: string;
  color: string;
}

export const workspaces: Workspace[] = [
  {
    id: "marketing",
    name: "Marketing",
    color: "#a855f7",
  },
  {
    id: "design",
    name: "Product Design",
    color: "#3b82f6",
  },
  {
    id: "development",
    name: "Development",
    color: "#22c55e",
  },
];