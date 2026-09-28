export interface TaskCategory {
  id: string;
  projectId: string;
  name: string;
}

export const TestTaskCategory: TaskCategory = {
  id: "Test ID",
  projectId: "Test ID",
  name: "Test Category",
};
