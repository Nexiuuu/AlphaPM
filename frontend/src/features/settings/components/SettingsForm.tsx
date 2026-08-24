import { useForm } from "react-hook-form";
import { Selectbar } from "../../../components/ui/selectionbar/Selectionbar";
import { useTheme } from "../../../hooks/useTheme";
import type { Language, NotificationPreference, Theme } from "../types";
import { Button } from "../../../components/ui/Button/Button";

type SettingsFormData = {
  theme: Theme;
  language: Language;
  notificationPreference: NotificationPreference;
};

export const SettingsForm = () => {
  const { setTheme } = useTheme();

  const { register, handleSubmit, reset } = useForm<SettingsFormData>();

  const onSubmit = (data: SettingsFormData) => {
    setTheme(data.theme);
  };

  return (
    <div>
      <form
        className="w-6/7 rounded-[var(--radius-md)] m-auto p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Selectbar label="Motyw:" variant="form" {...register("theme")}>
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
        <div className="flex justify-center mt-2">
          <Button variant="primary" type="submit" className="ml-auto mr-3">
            Zastosuj
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              reset();
            }}
            className="ml-3 mr-auto"
          >
            Cofnij
          </Button>
        </div>
      </form>
    </div>
  );
};
