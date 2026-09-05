import { ChartNoAxesCombined } from "lucide-react";
import { ModulePage } from "./ModulePage";

export const AnalyticsPage = () => 
    <ModulePage 
        icon={ChartNoAxesCombined} 
        eyebrow="Postęp" 
        title="Analityka" 
        description="Śledź tempo pracy, postęp i kondycję projektów." 
        emptyTitle="Raporty pojawią się tutaj" 
        emptyDescription="Gdy zadania zaczną trafiać do projektów, pokażemy wykresy postępu i obciążenia zespołu." 
    />;
