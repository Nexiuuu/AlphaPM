import { Settings } from "lucide-react";

import { SettingsForm } from "../features/settings/components/SettingsForm";

export const SettingsPage = () => {
  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-7">
        <p className="mb-2 flex select-none items-center gap-2 text-sm text-[var(--color-primary)]">
          <Settings size={16} />
          Ustawienia
        </p>
      </div>
      <SettingsForm></SettingsForm>
    </section>
  );
};
