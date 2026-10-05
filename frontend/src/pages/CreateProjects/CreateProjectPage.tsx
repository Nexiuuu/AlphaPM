import { useTranslation } from "react-i18next";
import { AuthenticatedContent } from "../../features/auth/components/AuthenticatedContent";
import { CreateProjectForm } from "./CreateProjectForm";
import { CreateProjectHeader } from "./CreateProjectHeader";

export const CreateProjectPage = () => {
    const { t } = useTranslation("createproject");

    return (
        <section className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
            <CreateProjectHeader />
            <AuthenticatedContent
                fallback={
                    <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-muted)]">
                        {t("fallback")}
                    </div>
                }
            >
                <CreateProjectForm />
            </AuthenticatedContent>
        </section>
    );
};
