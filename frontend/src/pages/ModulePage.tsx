import type { LucideIcon } from "lucide-react";
import { ArrowRight, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Card } from "../components/ui/Card/Card";
import { AuthenticatedContent } from "../features/auth/components/AuthenticatedContent";
import { GuestPreviewMessage } from "../features/auth/components/GuestPreviewMessage";

interface ModulePageProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  children?: ReactNode;
}

export const ModulePage = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  emptyTitle,
  emptyDescription,
  children,
}: ModulePageProps) => {
  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-7">
        <p className="flex items-center gap-2 text-sm text-[var(--color-primary)] !select-none [-webkit-text-stroke:4px_var(--color-surface-grid)] [paint-order:stroke_fill]">
          <Icon
            size={16}
            className="absolute stroke-[6px] stroke-[var(--color-surface-grid)]"
          />

          <Icon size={16} className="relative stroke-2" />
          {eyebrow}
        </p>

        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>

        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>

      {children ? (
        <AuthenticatedContent
          showChildrenToGuests
          fallback={
            <div className="mb-4">
              <GuestPreviewMessage
                title={`${title} nie pokazuje danych konta w podglądzie`}
                description="Zaloguj się, aby zobaczyć informacje powiązane z Twoimi projektami i zadaniami."
              />
            </div>
          }
        >
          {children}
        </AuthenticatedContent>
      ) : (
        <AuthenticatedContent
          fallback={
            <GuestPreviewMessage
              title={`Podgląd: ${title}`}
              description="Po zalogowaniu ta sekcja będzie korzystać z danych Twoich projektów i zadań."
            />
          }
        >
          <Card className="p-7 text-center sm:p-10">
            <Icon
              className="mx-auto mb-4 text-[var(--color-primary)] [-webkit-text-stroke:4px_var(--color-surface-grid)] [paint-order:stroke_fill]"
              size={28}
            />
            <h3 className="text-lg font-semibold">{emptyTitle}</h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-text-muted)]">
              {emptyDescription}
            </p>

            <Link
              to="/projects"
              className="
              mt-5 
              inline-flex 
              items-center 
              gap-2 
              rounded-[var(--radius-md)] 
              bg-[var(--color-primary)] 
              px-4 
              py-2 
              text-sm 
              font-medium 
              text-[var(--color-primary-foreground)]
              focus:outline-none
            "
              >
              <Plus size={17} /> Otwórz projekty
              <ArrowRight size={16} />
            </Link>
          </Card>
        </AuthenticatedContent>
      )}
    </section>
  );
};
