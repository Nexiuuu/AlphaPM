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
import { ProjectPage } from "../pages/Projects/project/ProjectPage";
import { AuthGuard } from "../features/auth/components/AuthGuard";
import type { AppTitleKey } from "../hooks/usePageTitle";

const pageTitle = (titleKey: AppTitleKey) => ({ titleKey });

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />,
      handle: pageTitle("common:pageTitles.login"),
    },
    {
      element: <AuthGuard />,
      children: [
        {
          path: "/",
          element: <AppLayout />,
          children: [
            {
              index: true,
              element: <DashboardPage />,
              handle: pageTitle("dashboard:pageTitle"),
            },
            {
              path: "Analytics",
              element: <AnalyticsPage />,
              handle: pageTitle("analytics:pageTitle"),
            },
            {
              path: "Calendar",
              element: <CalendarPage />,
              handle: pageTitle("calendar:pageTitle"),
            },
            {
              path: "Teams",
              element: <TeamPage />,
              handle: pageTitle("teams:pageTitle"),
            },
            {
              path: "Projects",
              element: <ProjectsPage />,
              handle: pageTitle("projects:pageTitle"),
            },
            {
              path: "Tasks",
              element: <TaskPage />,
              handle: pageTitle("tasks:pageTitle"),
            },
            {
              path: "Settings",
              element: <SettingsPage />,
              handle: pageTitle("settings:pageTitle"),
            },
            {
              path: "projects/new",
              element: <CreateProjectPage />,
              handle: pageTitle("common:pageTitles.createProject"),
            },
            {
              path: "projects/:id",
              element: <ProjectPage />,
              handle: pageTitle("common:pageTitles.project"),
            },
            {
              path: "*",
              element: <NotFoundPage />,
              handle: pageTitle("common:pageTitles.notFound"),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/AlphaPM",
  },
);
