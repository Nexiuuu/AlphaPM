interface GuestPreviewMessageProps {
  title: string;
  description: string;
}

export const GuestPreviewMessage = ({
  title,
  description,
}: GuestPreviewMessageProps) => (
  <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center sm:p-8">
    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
      Podgląd gościa
    </p>
    <h3 className="mt-2 font-semibold">{title}</h3>
    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--color-text-muted)]">
      {description}
    </p>
  </div>
);
