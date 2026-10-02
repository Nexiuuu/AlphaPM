import { useTranslation } from "react-i18next";

interface GuestPreviewMessageProps {
  title: string;
  description: string;
}

export const GuestPreviewMessage = ({
  title,
  description,
}: GuestPreviewMessageProps) => {
  const { t } = useTranslation("common")

  return (
    <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
        {t("guest.guestPrev")}
      </p>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  )
}
