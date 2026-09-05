import { CheckCircle2, FolderKanban, ListTodo, TriangleAlert } from "lucide-react";

import { StatCard } from "./StatCard";

interface DashboardStatsProps {
  projectsCount: number;
  isLoading: boolean;
}

export const DashboardStats = ({ projectsCount, isLoading }: DashboardStatsProps) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard label="Aktywne projekty" value={projectsCount} description="Twoje workspace'y" icon={<FolderKanban size={19} />} isLoading={isLoading} />
    <StatCard label="Zadania na dziś" value="—" description="Moduł zadań w przygotowaniu" icon={<ListTodo size={19} />} isLoading={isLoading} />
    <StatCard label="Zaległe zadania" value="—" description="Moduł zadań w przygotowaniu" icon={<TriangleAlert size={19} />} isLoading={isLoading} />
    <StatCard label="Ukończone w tym tygodniu" value="—" description="Moduł zadań w przygotowaniu" icon={<CheckCircle2 size={19} />} isLoading={isLoading} />
  </div>
);
