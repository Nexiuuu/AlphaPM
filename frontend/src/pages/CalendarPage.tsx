import { CalendarDays } from "lucide-react";
import { ModulePage } from "./ModulePage";

export const CalendarPage = () => 
    <ModulePage 
        icon={CalendarDays} 
        eyebrow="Terminy" 
        title="Kalendarz" 
        description="Zbierz ważne daty i plan pracy w jednym miejscu." 
        emptyTitle="Nie masz jeszcze terminów" 
        emptyDescription="Terminy z projektów i zadań pojawią się tutaj, gdy moduł zadań będzie gotowy." 
    />;
