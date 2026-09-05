import { FolderKanban } from "lucide-react";

import { Card } from "../../../components/ui/Card/Card";

export const DashboardEmptyState = () => (
  <Card className="p-7 text-center sm:p-10">
    <FolderKanban className="mx-auto mb-4 text-[var(--color-primary)]" size={28} />
    <h2 className="text-lg font-semibold">Zaloguj się, aby zobaczyć swój Dashboard</h2>
    <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-text-muted)]">
      Po zalogowaniu pokażemy Twoje projekty i bieżący stan pracy.
    </p>
  </Card>
);
