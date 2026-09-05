import { ListTodo } from "lucide-react";
import { ModulePage } from "./ModulePage";

export const TaskPage = () => 
    <ModulePage icon={ListTodo} 
        eyebrow="Plan pracy" 
        title="Zadania" 
        description="Zarządzaj tym, co jest do zrobienia." 
        emptyTitle="Twoja lista zadań jest gotowa" 
        emptyDescription="Utwórz projekt, aby zacząć dodawać zadania i ustalać ich priorytety." 
    />;
