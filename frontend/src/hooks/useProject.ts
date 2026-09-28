import { useContext } from "react";
import { ProjectContext } from "../features/project/ProjectContext";

export const useProjectTasks = () => {
  const context = useContext(ProjectContext);

  if (!context)
    throw new Error("useProject must be used inside ProjectProvider!");

  return context;
};
