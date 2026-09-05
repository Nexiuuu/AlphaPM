import type { LucideIcon } from "lucide-react";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "../components/ui/Card/Card";
import { useWorkspaces } from "../features/workspaces/useWorkspaces";

interface ModulePageProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
}

export const ModulePage = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  emptyTitle,
  emptyDescription,
}: ModulePageProps) => {
  const { isLoading, isAuthenticated } = useWorkspaces();

  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-7">
        <p className="flex items-center gap-2 text-sm text-[var(--color-primary)]"><Icon size={16} /> {eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
      </div>

      {!isLoading && !isAuthenticated ? (
        <Card className="p-7 text-center"><Icon className="mx-auto mb-3 text-[var(--color-primary)]" size={28} /><h3 className="text-lg font-semibold">Zaloguj się, aby kontynuować</h3><p className="mt-2 text-sm text-[var(--color-text-muted)]">Ta sekcja jest dostępna dla zalogowanych użytkowników.</p></Card>
      ) : (
        <Card className="p-7 text-center sm:p-10"><Icon className="mx-auto mb-4 text-[var(--color-primary)]" size={28} /><h3 className="text-lg font-semibold">{emptyTitle}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-text-muted)]">{emptyDescription}</p><Link to="/projects" className="mt-5 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)]"><Plus size={17} /> Otwórz projekty <ArrowRight size={16} /></Link></Card>
      )}
    </section>
  );
};
