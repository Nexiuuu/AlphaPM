export const NOTIFICATION_PREFERENCES = [
  "ALL",
  "MEDIUM",
  "HIGH",
  "IMPORTANT",
  "NOTHING",
] as const;
export type NotificationPreference = (typeof NOTIFICATION_PREFERENCES)[number];
export const DEFAULT_NOTIFICATION_PREFERENCE: NotificationPreference = "MEDIUM";

export const THEMES = ["DARK", "LIGHT"] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = "DARK";

export const LANGUAGES = ["PL", "EN"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "PL";

export function isValidTheme(value: unknown): value is Theme {
  return (
    typeof value === "string" && (THEMES as readonly string[]).includes(value)
  );
}

export function isValidLanguage(value: unknown): value is Language {
  return (
    typeof value === "string" &&
    (LANGUAGES as readonly string[]).includes(value)
  );
}

export function isValidNotificationPreference(
  value: unknown,
): value is NotificationPreference {
  return (
    typeof value === "string" &&
    (NOTIFICATION_PREFERENCES as readonly string[]).includes(value)
  );
}
