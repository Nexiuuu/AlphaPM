import { getCookie, setCookie } from "../../lib/utils/cookies/Cookies";
import * as Settings from "./types";

type UserSettings = {
  theme: Settings.Theme;
  language: Settings.Language;
  notificationPreference: Settings.NotificationPreference;
};

const SETTINGS_COOKIE_NAME = "user_settings";

const DEFAULT_SETTINGS: UserSettings = {
  theme: Settings.DEFAULT_THEME,
  language: Settings.DEFAULT_LANGUAGE,
  notificationPreference: Settings.DEFAULT_NOTIFICATION_PREFERENCE,
};

export function saveUserSettings(settings: UserSettings) {
  setCookie(SETTINGS_COOKIE_NAME, JSON.stringify(settings));
}

export function getUserSettings(): UserSettings {
  const raw = getCookie(SETTINGS_COOKIE_NAME);
  if (!raw) return DEFAULT_SETTINGS;

  try {
    const parsed = JSON.parse(raw);
    return {
      theme: Settings.isValidTheme(parsed.theme)
        ? parsed.theme
        : DEFAULT_SETTINGS.theme,
      language: Settings.isValidLanguage(parsed.language)
        ? parsed.language
        : DEFAULT_SETTINGS.language,
      notificationPreference: Settings.isValidNotificationPreference(
        parsed.notificationPreference,
      )
        ? parsed.notificationPreference
        : DEFAULT_SETTINGS.notificationPreference,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function updateUserSetting<K extends keyof UserSettings>(
  key: K,
  value: UserSettings[K],
) {
  const current = getUserSettings();
  saveUserSettings({ ...current, [key]: value });
}
