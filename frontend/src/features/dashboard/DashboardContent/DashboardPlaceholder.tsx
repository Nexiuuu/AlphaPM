import type { ReactNode } from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "../../../components/ui/Card/Card";

interface DashboardPlaceholderProps {
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  linkLabel: string;
  to: string;
}

export const DashboardPlaceholder = ({
  icon,
  label,
  title,
  description,
  linkLabel,
  to,
}: DashboardPlaceholderProps) => (
  <Card className="p-5 sm:p-6">
    <div className="flex items-center gap-2 text-[var(--color-primary)]">
      {icon}
      <p className="text-sm font-medium">{label}</p>
    </div>
    <h2 className="mt-3 text-lg font-semibold">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
      {description}
    </p>
    <Link
      to={to}
      className="mt-5 inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
    >
      {linkLabel} <ArrowRight size={16} />
    </Link>
  </Card>
);
