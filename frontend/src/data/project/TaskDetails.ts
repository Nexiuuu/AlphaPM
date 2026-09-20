import type { Task } from "./Task";
import type { TaskCategory } from "./TaskCategory";
import type { TaskGroup } from "./TaskGroup";

export interface TaskDetails extends Task {
  author: string;
  gruops: TaskGroup[];
  categories: TaskCategory[];
  description: string;
  createdAt: Date;
}
