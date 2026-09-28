export interface Task {
  id: string;
  name: string;
  authorId: string;
  projectId: string;
  color: string;
  startsAt: Date;
  endsAt: Date;
  allDay: boolean;
}

export interface CreateTaskInput {
  name: string;
  color: string;
  startsAt: Date;
  endsAt: Date;
  allDay: boolean;
}

export interface UpdateTaskInput {
  name: string;
  color: string;
  startsAt: Date;
  endsAt: Date;
  allDay: boolean;
}

export const testTask: Task = {
  id: "Test ID",
  name: "Test Task",
  authorId: "Test Author ID",
  projectId: "Test Project ID",
  color: "#FFFF00",
  startsAt: new Date(2026, 8, 28),
  endsAt: new Date(2026, 8, 30),
  allDay: true,
};
