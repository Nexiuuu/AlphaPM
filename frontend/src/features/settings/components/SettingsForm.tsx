import { useForm } from "react-hook-form";
import { Selectbar } from "../../../components/ui/selectionbar/Selectionbar";
import { useTheme } from "../../../hooks/useTheme";
import type { Language, NotificationPreference, Theme } from "../types";
import { Button } from "../../../components/ui/Button/Button";
import { useFlash } from "../../../hooks/animations/useFlash";
import { getUserTheme } from "../LocalStorageSettings";

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
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    setTheme(data.theme);
    trigger();
  };

  const handleCancel = () => {
    reset({
      theme: getUserTheme(),
    });
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
            type="button"
            onClick={handleCancel}
            className="ml-3 mr-auto"
          >
            Cofnij
          </Button>
        </div>
      </form>
    </div>
  );
};
