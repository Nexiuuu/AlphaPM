import { useContext } from "react";

import { WorkspacesContext } from "./workspacesStore";

export const useWorkspaces = () => {
  const context = useContext(WorkspacesContext);

  if (!context) {
    throw new Error("useWorkspaces must be used inside WorkspacesProvider.");
  }

  return context;
};
