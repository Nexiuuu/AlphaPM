import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout/AppLayout";

import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { CalendarPage } from "../pages/CalendarPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { TaskPage } from "../pages/TaskPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    handle: { title: "Logowanie" },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    handle: { title: "Rejestracja" },
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
    ],
  },
]);
