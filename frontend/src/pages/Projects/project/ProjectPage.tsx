import { CalendarDays, ListTodo } from "lucide-react";
import { DashboardHeader } from "../../Dashboard/DashboardContent/DashboardHeader";
import { useWorkspaces } from "../../../features/workspaces/useWorkspaces";
import { DashboardEmptyState } from "../../Dashboard/DashboardContent/DashboardEmptyState";
import { DashboardStats } from "../../Dashboard/DashboardStats/DashboardStats";
import { RecentProjects } from "../../Dashboard/DashboardContent/RecentProjects";
import { DashboardPlaceholder } from "../../Dashboard/DashboardContent/DashboardPlaceholder";
import { NotFoundPage } from "../../NotFoundPage";

export const ProjectPage = () => {
  const { workspaces, isAuthenticated, isLoading, error } = useWorkspaces();

  return <NotFoundPage />; //work in progress

};
