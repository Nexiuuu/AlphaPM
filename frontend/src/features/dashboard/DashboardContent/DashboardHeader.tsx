import { Globe, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 flex items-center gap-2 text-sm text-[var(--color-primary)] select-none">
          <Globe size={16} />
          {t("badge")}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("heroTitle")}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {t("heroSubtitle")}
        </p>
      </div>

      <Link
        to="/projects"
        className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
      >
        <Eye size={18} />
        {t("seeProjects")}
      </Link>
    </div>
  )
}

