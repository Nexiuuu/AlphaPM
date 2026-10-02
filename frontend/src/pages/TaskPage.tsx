import { ListTodo } from "lucide-react";
import { ModulePage } from "./ModulePage";
import { useTranslation } from "react-i18next";

export const TaskPage = () => {
    const { t } = useTranslation("tasks");

    return (
        <ModulePage icon={ListTodo}
            eyebrow={t("workPlan")}
            title={t("tasks")}
            description={t("description")}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDesc")}
        />
    );
};