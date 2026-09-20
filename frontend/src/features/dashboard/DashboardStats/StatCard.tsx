import type { ReactNode } from "react";

import { Card } from "../../../components/ui/Card/Card";

interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  isLoading?: boolean;
}

export const StatCard = ({ label, value, description, icon, isLoading = false }: StatCardProps) => (
  <Card className="flex min-h-38 flex-col justify-between p-5">
    <div className="flex items-start justify-between gap-3">
      <h2 className="text-sm font-medium text-[var(--color-text-muted)]">{label}</h2>
      <span className="rounded-xl bg-[var(--color-primary)]/10 p-2 text-[var(--color-primary)]">{icon}</span>
    </div>
    {isLoading ? <div className="mt-5 h-9 w-16 animate-pulse rounded bg-[var(--color-text-muted)]/20" /> : <p className="mt-5 text-3xl font-bold tracking-tight text-[var(--color-text)]">{value}</p>}
    <p className="mt-2 text-xs text-[var(--color-text-muted)]">{description}</p>
  </Card>
);
