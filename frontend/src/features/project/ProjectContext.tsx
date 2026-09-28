import { createContext } from "react";
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "../../data/task/Task";

export interface ProjectContextValue {
  tasks: Task[];
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  createTask: (input: CreateTaskInput) => Promise<Task>;
  updateTask: (taskId: string, input: UpdateTaskInput) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
  reloadTasks: () => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextValue | null>(null);
