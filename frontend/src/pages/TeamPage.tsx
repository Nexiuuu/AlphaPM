import { UsersRound } from "lucide-react";
import { ModulePage } from "./ModulePage";
import { useTranslation } from "react-i18next";

export const TeamPage = () => {
    const { t } = useTranslation("teams");

    return (
        <ModulePage icon={UsersRound}
            eyebrow={t("coop")}
            title={t("team")}
            description={t("description")}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
        />
    );
};
