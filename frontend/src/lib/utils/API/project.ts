import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "../../../data/task/Task";
import { ApiError } from "../../../errors/ApiError";
import { getAuthenticatedSession } from "../../auth/getAuthenticatedSession";
import { apiFetch } from "./apiFetch";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getProjectTasksRequest = async (id: string): Promise<Task[]> => {
  const session = await getAuthenticatedSession();

  const response = await apiFetch(
    `${API_URL}/api/projects/${id}/tasks`,
    {
      method: "GET",
    },
    session.access_token,
  );

  if (!response.ok)
    throw new ApiError(
      `Failed to fetch tasks in project: ${id}`,
      response.status,
    );

  return response.json();
};

export const createTaskRequest = async (
  input: CreateTaskInput,
): Promise<Task> => {
  const session = await getAuthenticatedSession();

  const response = await apiFetch(
    `${API_URL}/api/tasks`,
    {
      method: "POST",
      body: JSON.stringify({
        name: input.name,
        color: input.color,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
        allDay: input.allDay,
      }),
    },
    session.access_token,
  );

  if (!response.ok) {
    throw new ApiError(`Failed to create task`, response.status);
  }

  return response.json();
};

export const updateTaskRequest = async (
  taskId: string,
  input: UpdateTaskInput,
): Promise<Task> => {
  const session = await getAuthenticatedSession();

  const response = await apiFetch(
    `${API_URL}/api/tasks/${taskId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        name: input.name,
        color: input.color,
      }),
    },
    session.access_token,
  );

  if (!response.ok) {
    throw new ApiError(`Failed to update task`, response.status);
  }

  return response.json();
};

export const deleteTaskRequest = async (taskId: string): Promise<void> => {
  const session = await getAuthenticatedSession();

  const response = await apiFetch(
    `${API_URL}/api/tasks/${taskId}`,
    { method: "DELETE" },
    session.access_token,
  );

  if (!response.ok) {
    throw new ApiError(`Failed to delete task`, response.status);
  }
};
