import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout/AppLayout";

import { DashboardPage } from "../pages/DashboardPage";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { CalendarPage } from "../pages/CalendarPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { TaskPage } from "../pages/TaskPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "Analytics",
                element: <AnalyticsPage />,
            },
            {
                path: "Calendar",
                element: <CalendarPage />,
            },
            {
                path: "Projects",
                element: <ProjectsPage />,
            },
            {
                path: "Tasks",
                element: <TaskPage />,
            },
            {
                path: "Settings",
                element: <SettingsPage />,
            }
        ]
    }
])