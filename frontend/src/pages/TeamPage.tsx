import { UsersRound } from "lucide-react";
import { ModulePage } from "./ModulePage";

export const TeamPage = () => 
    <ModulePage icon={UsersRound} 
        eyebrow="Współpraca" 
        title="Zespół" 
        description="Zobacz osoby pracujące nad projektami." 
        emptyTitle="Zaproś swój zespół" 
        emptyDescription="Gdy współpraca zespołowa będzie aktywna, tutaj zobaczysz członków i ich role." 
    />;
