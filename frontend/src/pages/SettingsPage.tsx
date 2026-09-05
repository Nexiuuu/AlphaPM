import { SettingsForm } from "../features/settings/components/SettingsForm";

export const SettingsPage = () => {
  return (
    <section className="mx-auto max-w-6xl p-8">
      <div className="mb-7">
        <p className="mb-2 text-sm text-[var(--color-text-muted)] select-none">
          Ustawienia
        </p>
      </div>
      <SettingsForm></SettingsForm>
    </section>
  );
};
