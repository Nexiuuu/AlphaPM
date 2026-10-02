import { useForm } from "react-hook-form";
import { Selectbar } from "../../../components/ui/selectionbar/Selectionbar";
import { useTheme } from "../../../hooks/useTheme";
import type { Language, NotificationPreference, Theme } from "../types";
import { Button } from "../../../components/ui/Button/Button";
import { useFlash } from "../../../hooks/animations/useFlash";
import { getUserSettings, getUserTheme, updateUserSetting } from "../LocalStorageSettings";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

type SettingsFormData = {
  theme: Theme;
  language: Language;
  notificationPreference: NotificationPreference;
};

export const SettingsForm = () => {
  const { setTheme } = useTheme();
  const { trigger } = useFlash();
  const { register, handleSubmit, reset } = useForm<SettingsFormData>({
    defaultValues: {
      theme: getUserTheme(),
      language: getUserSettings().language,
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    const currentSettings = getUserSettings();

    const hasChanges =
      data.theme !== currentSettings.theme ||
      data.language !== currentSettings.language;

    setTheme(data.theme);

    updateUserSetting("language", data.language);
    void i18n.changeLanguage(data.language.toLowerCase())

    if (hasChanges) {
      trigger();
    }
  };

  const handleCancel = () => {
    reset({
      theme: getUserTheme(),
      language: getUserSettings().language,
    });
  };

  const { t } = useTranslation("settings");

  return (
    <div>
      <form
        className="w-6/7 rounded-[var(--radius-md)] m-auto p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <Selectbar label={t("themeLabel")} variant="form" {...register("theme")}>
            <option
              className="bg-[var(--color-surface)] text-[var(--color-text)]"
              value={"DARK"}
            >
              {t("themeDark")}
            </option>
            <option
              className="bg-[var(--color-surface)] text-[var(--color-text)]"
              value={"LIGHT"}
            >
              {t("themeLight")}
            </option>
          </Selectbar>

          <Selectbar label={t("langLabel")} variant="form" {...register("language")}>
            <option
              className="bg-[var(--color-surface)] text-[var(--color-text)]"
              value={"PL"}
            >
              Polski
            </option>
            <option
              className="bg-[var(--color-surface)] text-[var(--color-text)]"
              value={"EN"}
            >
              English
            </option>
          </Selectbar>
        </div>

        <div className="flex justify-center mt-2">
          <Button variant="primary" type="submit" className="ml-auto mr-3">
            {t("apply")}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={handleCancel}
            className="ml-3 mr-auto"
          >
            {t("undo")}
          </Button>
        </div>
      </form>
    </div>
  );
};
