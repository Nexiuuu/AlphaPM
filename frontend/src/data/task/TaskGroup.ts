export interface TaskGroup {
  id: string;
  name: string;
  author: string;
  projectId: string;
  color: string;
  createdAt: Date;
}

export const TestTaskGroup: TaskGroup = {
  id: "Test Group ID",
  name: "Test Group",
  author: "Test Author",
  projectId: "Test Project ID",
  color: "#FFFFFF",
  createdAt: new Date("27.09.2026"),
};
