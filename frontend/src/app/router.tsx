import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout/AppLayout";

import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { CalendarPage } from "../pages/CalendarPage";
import { ProjectsPage } from "../pages/Projects/ProjectsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { TeamPage } from "../pages/TeamPage";
import { TaskPage } from "../pages/TaskPage";
import { LoginPage } from "../pages/LoginPage";
import { CreateProjectPage } from "../pages/CreateProjects/CreateProjectPage";

// 404
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />,
      handle: { title: "Logowanie" },
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
          handle: { title: "Dashboard" },
        },
        {
          path: "Analytics",
          element: <AnalyticsPage />,
          handle: { title: "Analytics" },
        },
        {
          path: "Calendar",
          element: <CalendarPage />,
          handle: { title: "Calendar" },
        },
        {
          path: "Team",
          element: <TeamPage />,
          handle: { title: "Team" },
        },
        {
          path: "Projects",
          element: <ProjectsPage />,
          handle: { title: "Projects" },
        },
        {
          path: "Tasks",
          element: <TaskPage />,
          handle: { title: "Tasks" },
        },
        {
          path: "Settings",
          element: <SettingsPage />,
          handle: { title: "Settings" },
        },
        {
          path: "projects/new",
          element: <CreateProjectPage />,
          handle: { title: "Nowy projekt" },
        },
        {
          path: "*",
          element: <NotFoundPage />,
          handle: { title: "Nie znaleziono" },
        },
      ],
    },
  ],
  {
    basename: "/AlphaPM",
  },
);
