import { ChartNoAxesCombined } from "lucide-react";
import { ModulePage } from "./ModulePage";
import { useTranslation } from "react-i18next";

export const AnalyticsPage = () => {
    const { t } = useTranslation("analytics");

    return (
        <ModulePage
            icon={ChartNoAxesCombined}
            eyebrow={t("progress")}
            title={t("title")}
            description={t("description")}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
        />
    );
};
