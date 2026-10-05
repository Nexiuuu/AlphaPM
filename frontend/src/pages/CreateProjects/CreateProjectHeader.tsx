import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export const CreateProjectHeader = () => {
    const { t } = useTranslation("createproject");

    return (
        <header
            className="py-6"
        >
            <Link
                to="/projects"
                className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
                <ArrowLeft size={19} />
                {t("back")}
            </Link>

            <h1
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
                {t("createNewProject")}
            </h1>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {t("desc")}
            </p>
        </header>
    );
};