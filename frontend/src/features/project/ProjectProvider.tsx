import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  testTask,
  type CreateTaskInput,
  type Task,
  type UpdateTaskInput,
} from "../../data/task/Task";
import {
  createTaskRequest,
  deleteTaskRequest,
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

export const ProjectProvider = ({
  children /*, id*/,
}: PropsWithChildren<Props>) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async (authenticated: boolean) => {
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
      // const data = await getProjectTasksRequest(id);

      // if (currentRequestId != requestId.current) return;

      // setTasks(data);
      setTasks([testTask]);
    } catch (caughtError) {
      if (currentRequestId != requestId.current) return;
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się pobrać zadań";

      setError(message);
    } finally {
      if (currentRequestId === requestId.current) setIsLoading(false);
    }
  }, []);

  const reloadTasks = useCallback(async () => {
    try {
      const session = await getCurrentSession();
      await load(Boolean(session));
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się sprawdzić sesji użytkownika.";

      setError(message);
      setIsLoading(false);
    }
  }, [load]);

  const createTask = async (input: CreateTaskInput) => {
    const task = await createTaskRequest(input);
    setTasks((current) => [task, ...current]);

    return task;
  };

  const updateTask = async (id: string, input: UpdateTaskInput) => {
    const task = await updateTaskRequest(id, input);
    setTasks((current) => [task, ...current]);

    return task;
  };

  const deleteTask = async (id: string) => {
    const task = await deleteTaskRequest(id);
    setTasks((current) => current.filter((task) => task.id !== id));

    return task;
  };

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

  useEffect(() => {
    getCurrentSession()
      .then((session) => {
        void load(Boolean(session));
      })
      .catch((caughtError: unknown) => {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Nie udało się sprawdzić sesji użytkownika.";

        setError(message);
        setIsLoading(false);
      });
    const subscription = subscribeToAuthChanges((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT")
        void load(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, [load]);

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
