import { useForm } from "react-hook-form";
import { Selectbar } from "../../../components/ui/selectionbar/Selectionbar";
import { useTheme } from "../../../hooks/useTheme";
import type { Language, NotificationPreference, Theme } from "../types";
import { Button } from "../../../components/ui/Button/Button";
import { useFlash } from "../../../hooks/animations/useFlash";
import { getUserSettings, getUserTheme, updateUserSetting } from "../LocalStorageSettings";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { Typebar } from "../../../components/ui/typebar/Typebar";
import { Tooltip } from "../../../components/ui/Tooltip/Tooltip";

type SettingsFormData = {
  theme: Theme;
  language: Language;
  notificationPreference: NotificationPreference;
  nickname: string;
  notificationEmail: string;
};

export const SettingsForm = () => {
  const { setTheme } = useTheme();
  const { trigger } = useFlash();
  const { register, handleSubmit, reset } = useForm<SettingsFormData>({
    defaultValues: {
      theme: getUserTheme(),
      language: getUserSettings().language,
      notificationPreference: getUserSettings().notificationPreference,
      nickname: getUserSettings().nickname,
      notificationEmail: getUserSettings().notificationEmail,
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    const currentSettings = getUserSettings();

    const hasChanges =
      data.theme !== currentSettings.theme ||
      data.language !== currentSettings.language ||
      data.notificationPreference !== currentSettings.notificationPreference ||
      data.nickname !== currentSettings.nickname ||
      data.notificationEmail !== currentSettings.notificationEmail;

    setTheme(data.theme);

    updateUserSetting("language", data.language);
    updateUserSetting("notificationPreference", data.notificationPreference);
    updateUserSetting("nickname", data.nickname);
    updateUserSetting("notificationEmail", data.notificationEmail);
    void i18n.changeLanguage(data.language.toLowerCase())

    if (hasChanges) {
      trigger();
    }
  };

  const handleCancel = () => {
    reset({
      theme: getUserTheme(),
      language: getUserSettings().language,
      notificationPreference: getUserSettings().notificationPreference,
      nickname: getUserSettings().nickname,
      notificationEmail: getUserSettings().notificationEmail,
    });
  };

  const { t } = useTranslation("settings");

  return (
    <div>
      <form
        className="w-6/7 rounded-[var(--radius-md)] m-auto p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[var(--color-text)]">
              {t("preferencesSection")}
            </h2>
            <Selectbar label={t("themeLabel")} variant="form" {...register("theme")}>
              <option
                className="bg-[var(--color-surface)] text-[var(--color-text)]"
                value="DARK"
              >
                {t("themeDark")}
              </option>
              <option
                className="bg-[var(--color-surface)] text-[var(--color-text)]"
                value="LIGHT"
              >
                {t("themeLight")}
              </option>
            </Selectbar>

            <Selectbar label={t("langLabel")} variant="form" {...register("language")}>
              <option
                className="bg-[var(--color-surface)] text-[var(--color-text)]"
                value="PL"
              >
                {t("languagePolish")}
              </option>
              <option
                className="bg-[var(--color-surface)] text-[var(--color-text)]"
                value="EN"
              >
                {t("languageEnglish")}
              </option>
            </Selectbar>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[var(--color-text)]">
              {t("accountSection")}
            </h2>
            <div className="flex items-center gap-1">
              <div className="flex w-32 shrink-0 items-center gap-1">
                <label
                  htmlFor="nickname"
                  className="shrink-0 whitespace-nowrap text-left text-base text-[var(--color-text)]"
                >
                  {t("nicknameLabel")}
                </label>
                <Tooltip
                  ariaLabel={t("nicknameHelpLabel")}
                  content={t("nicknameHelp")}
                />
              </div>
              <Typebar
                label={t("nicknameLabel")}
                id="nickname"
                className="max-w-2xl flex-1 text-left"
                {...register("nickname")}
              />
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[var(--color-text)]">
              {t("notificationsSection")}
            </h2>
            <div className="flex items-center gap-1">
              <div className="flex w-fit shrink-0 items-center gap-2">
                <label
                  htmlFor="notificationEmail"
                  className="shrink-0 whitespace-nowrap text-left text-base text-[var(--color-text)]"
                >
                  {t("notificationEmailLabel")}
                </label>
                <Tooltip
                  ariaLabel={t("notificationEmailHelpLabel")}
                  content={t("notificationEmailHelp")}
                />
              </div>
              <Typebar
                label={t("notificationEmailLabel")}
                id="notificationEmail"
                type="email"
                className="max-w-2xl flex-1 text-left"
                {...register("notificationEmail")}
              />
            </div>
            <Selectbar
              label={t("notificationPreferenceLabel")}
              variant="form"
              {...register("notificationPreference")}
            >
              <option value="HIGH">{t("notificationHigh")}</option>
              <option value="MEDIUM">{t("notificationMedium")}</option>
              <option value="ALL">{t("notificationAll")}</option>
            </Selectbar>
          </section>
        </div>

        <div className="flex justify-center mt-12">
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
