import { useMatches } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type AppTitleKey =
  | "common:pageTitles.login"
  | "common:pageTitles.createProject"
  | "common:pageTitles.project"
  | "common:pageTitles.notFound"
  | "dashboard:pageTitle"
  | "calendar:pageTitle"
  | "projects:pageTitle"
  | "settings:pageTitle"
  | "tasks:pageTitle"
  | "analytics:pageTitle"
  | "teams:pageTitle"
  | "search:pageTitle";

interface RouteHandle {
  titleKey?: AppTitleKey;
}

export const usePageTitle = (): string => {
  const matches = useMatches();
  const { t, i18n } = useTranslation([
    "common",
    "calendar",
    "dashboard",
    "projects",
    "settings",
    "tasks",
    "analytics",
    "teams",
    "search",
  ]);

  // We retrieve the last (most nested) matching route
  const currentMatch = matches[matches.length - 1];

  // safely cast the handle to our interface
  const handle = currentMatch?.handle as RouteHandle | undefined;

  const titleKey = handle?.titleKey;

  if (!titleKey) return t("common:pageTitles.notFound");

  // Check if key exists in i18n resources; fallback to Dashboard if missing
  if (!i18n.exists(titleKey)) return t("common:pageTitles.notFound");

  // returns the title; if the requested title is not found, it returns the Dashboard
  const translatedTitle = t(titleKey);

  return typeof translatedTitle === "string"
    ? translatedTitle
    : t("common:pageTitles.notFound");
};
