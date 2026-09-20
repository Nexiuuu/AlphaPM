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
          handle: { title: "Panel Główny" },
        },
        {
          path: "Analytics",
          element: <AnalyticsPage />,
          handle: { title: "Analityka" },
        },
        {
          path: "Calendar",
          element: <CalendarPage />,
          handle: { title: "Kalendarz" },
        },
        {
          path: "Teams",
          element: <TeamPage />,
          handle: { title: "Zespoły" },
        },
        {
          path: "Projects",
          element: <ProjectsPage />,
          handle: { title: "Projekty" },
        },
        {
          path: "Tasks",
          element: <TaskPage />,
          handle: { title: "Zadania" },
        },
        {
          path: "Settings",
          element: <SettingsPage />,
          handle: { title: "Ustawienia" },
        },
        {
          path: "projects/new",
          element: <CreateProjectPage />,
          handle: { title: "Nowy projekt" },
        },
        {
          path: "projects/:id",
          element: <ProjectPage />,
          handle: { title: "Projekt" },
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
