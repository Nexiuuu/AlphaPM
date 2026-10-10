import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// PL Imports
import commonPL from "../locales/pl/common.json";
import sidebarPL from "../locales/pl/sidebar.json";
import headerPL from "../locales/pl/header.json";
import dashboardPL from "../locales/pl/dashboard.json";
import calendarPL from "../locales/pl/calendar.json";
import projectsPL from "../locales/pl/projects.json";
import settingsPL from "../locales/pl/settings.json";
import tasksPL from "../locales/pl/tasks.json";
import analyticsPL from "../locales/pl/analytics.json";
import teamsPL from "../locales/pl/teams.json";
import projectPL from "../locales/pl/project.json";
import notfoundPL from "../locales/pl/notfound.json";
import loginPL from "../locales/pl/login.json";
import createprojectPL from "../locales/pl/createproject.json";
import searchPL from "../locales/pl/search.json";

// EN Imports
import commonEN from "../locales/en/common.json";
import sidebarEN from "../locales/en/sidebar.json";
import headerEN from "../locales/en/header.json";
import dashboardEN from "../locales/en/dashboard.json";
import calendarEN from "../locales/en/calendar.json";
import projectsEN from "../locales/en/projects.json";
import settingsEN from "../locales/en/settings.json";
import tasksEN from "../locales/en/tasks.json";
import analyticsEN from "../locales/en/analytics.json";
import teamsEN from "../locales/en/teams.json";
import projectEN from "../locales/en/project.json";
import notfoundEN from "../locales/en/notfound.json";
import loginEN from "../locales/en/login.json";
import createprojectEN from "../locales/en/createproject.json";
import searchEN from "../locales/en/search.json";

import { getUserSettings } from "./features/settings/LocalStorageSettings";

const rawLanguage = getUserSettings().language;
const initLanguage = rawLanguage ? rawLanguage.toLowerCase() : "pl";

export const defaultNS = "common";
export const resources = {
  pl: {
    common: commonPL,
    sidebar: sidebarPL,
    header: headerPL,
    dashboard: dashboardPL,
    calendar: calendarPL,
    projects: projectsPL,
    settings: settingsPL,
    tasks: tasksPL,
    analytics: analyticsPL,
    teams: teamsPL,
    project: projectPL,
    notfound: notfoundPL,
    login: loginPL,
    createproject: createprojectPL,
    search: searchPL,
  },
  en: {
    common: commonEN,
    sidebar: sidebarEN,
    header: headerEN,
    dashboard: dashboardEN,
    calendar: calendarEN,
    projects: projectsEN,
    settings: settingsEN,
    tasks: tasksEN,
    analytics: analyticsEN,
    teams: teamsEN,
    project: projectEN,
    notfound: notfoundEN,
    login: loginEN,
    createproject: createprojectEN,
    search: searchEN,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: initLanguage, // Default language
  fallbackLng: "pl",
  ns: [
    "common",
    "sidebar",
    "header",
    "dashboard",
    "calendar",
    "projects",
    "settings",
    "tasks",
    "analytics",
    "teams",
    "project",
    "notfound",
    "login",
    "createproject",
    "search",
  ],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
