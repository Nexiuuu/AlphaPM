import type { Task } from "./Task";
import { TestTaskCategory, type TaskCategory } from "./TaskCategory";
import { TestTaskGroup, type TaskGroup } from "./TaskGroup";

export interface TaskDetails extends Task {
  authorName: string;
  groups: TaskGroup[];
  categories: TaskCategory[];
  description: string;
  createdAt: Date;
  lastUpdate: Date;
}

export const testTaskDetails: TaskDetails = {
  id: "Test ID",
  name: "Test Task",
  authorId: "Test Author ID",
  projectId: "Test Project ID",
  color: "#FFFF00",
  startsAt: new Date("28.09.2026"),
  endsAt: new Date("30.09.2026"),
  allDay: true,

  authorName: "Test Author Name",
  groups: [TestTaskGroup],
  categories: [TestTaskCategory],
  description: "Test Description",
  createdAt: new Date("26.09.2026"),
  lastUpdate: new Date("27.09.2026"),
};
