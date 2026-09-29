import { AuthenticatedContent } from "../../features/auth/components/AuthenticatedContent";
import { CreateProjectForm } from "./CreateProjectForm";
import { CreateProjectHeader } from "./CreateProjectHeader";

export const CreateProjectPage = () => {
    return (
        <section className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
            <CreateProjectHeader />
            <AuthenticatedContent
                fallback={
                    <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-muted)]">
                        Podgląd formularza tworzenia projektu pojawi się po
                        zalogowaniu.
                    </div>
                }
            >
                <CreateProjectForm />
            </AuthenticatedContent>
        </section>
    );
};
