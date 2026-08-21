import { useForm } from "react-hook-form";
import { Selectbar } from "../../../components/ui/selectionbar/Selectionbar";
import { useTheme } from "../../../hooks/useTheme";
import type { Language, NotificationPreference, Theme } from "../types";

type SettingsFormData = {
  theme: Theme;
  language: Language;
  notificationPreference: NotificationPreference;
};

export const SettingsForm = () => {
  const { setTheme } = useTheme();

  const { register, handleSubmit } = useForm<SettingsFormData>();

  const onSubmit = (data: SettingsFormData) => {
    setTheme(data.theme);
  };

  return (
    <div>
      <form
        className="w-6/7 rounded-[var(--radius-md)] mx-auto px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Selectbar variant="form" {...register("theme")}>
          <option
            className="bg-[var(--color-surface)] text-[var(--color-text)]"
            value={"DARK"}
          >
            Ciemny
          </option>
          <option
            className="bg-[var(--color-surface)] text-[var(--color-text)]"
            value={"LIGHT"}
          >
            Jasny
          </option>
        </Selectbar>
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};
