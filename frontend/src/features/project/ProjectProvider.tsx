import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import {
  type CreateTaskInput,
  type Task,
  type UpdateTaskInput,
} from "../../data/task/Task";

import {
  createTaskRequest,
  deleteTaskRequest,
  getProjectTasksRequest,
  updateTaskRequest,
} from "../../lib/utils/API/project";

import { ProjectContext } from "./ProjectContext";

import {
  getCurrentSession,
  subscribeToAuthChanges,
} from "../../lib/utils/API/auth";

interface Props {
  id: string;
}

export const ProjectProvider = ({ children, id }: PropsWithChildren<Props>) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestId = useRef(0);

  const load = useCallback(
    async (authenticated: boolean) => {
      const currentRequestId = ++requestId.current;

      setIsAuthenticated(authenticated);
      setError(null);

      if (!authenticated) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const data = await getProjectTasksRequest(id);

        if (currentRequestId !== requestId.current) return;

        setTasks(data);
      } catch (caughtError: unknown) {
        if (currentRequestId !== requestId.current) return;

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Nie udało się pobrać zadań.",
        );
      } finally {
        if (currentRequestId === requestId.current) {
          setIsLoading(false);
        }
      }
    },
    [id],
  );

  const reloadTasks = useCallback(async () => {
    try {
      const session = await getCurrentSession();
      await load(Boolean(session));
    } catch (caughtError: unknown) {
      ++requestId.current;

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się sprawdzić sesji użytkownika.",
      );
      setIsLoading(false);
    }
  }, [load]);

  const createTask = useCallback(
    async (input: CreateTaskInput): Promise<Task> => {
      const task = await createTaskRequest(input);

      setTasks((current) => [task, ...current]);
      setError(null);

      return task;
    },
    [],
  );

  const updateTask = useCallback(
    async (taskId: string, input: UpdateTaskInput): Promise<Task> => {
      const updatedTask = await updateTaskRequest(taskId, input);

      setTasks((current) =>
        current.map((existingTask) =>
          existingTask.id === taskId ? updatedTask : existingTask,
        ),
      );

      setError(null);
      return updatedTask;
    },
    [],
  );

  const deleteTask = useCallback(async (taskId: string): Promise<void> => {
    await deleteTaskRequest(taskId);

    setTasks((current) => current.filter((task) => task.id !== taskId));

    setError(null);
  }, []);

  useEffect(() => {
    let active = true;
    const requestIdRef = requestId;

    getCurrentSession()
      .then((session) => {
        if (active) {
          void load(Boolean(session));
        }
      })
      .catch((caughtError: unknown) => {
        if (!active) return;

        ++requestIdRef.current;

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Nie udało się sprawdzić sesji użytkownika.",
        );
        setIsLoading(false);
      });

    const subscription = subscribeToAuthChanges((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        void load(Boolean(session));
      }
    });

    return () => {
      active = false;
      ++requestIdRef.current;
      subscription.unsubscribe();
    };
  }, [load]);

  const value = {
    tasks,
    isLoading,
    isAuthenticated,
    error,
    createTask,
    updateTask,
    deleteTask,
    reloadTasks,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
