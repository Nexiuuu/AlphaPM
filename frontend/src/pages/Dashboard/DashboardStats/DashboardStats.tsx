import { StatCard } from "./StatCard";
import { useProjects } from "../../../hooks/useProjects";

export const DashboardStats = () => {
  const { projects, loading, error } = useProjects();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard
        label="Total Projects"
        value={loading ? "…" : error ? "—" : projects.length}
      />

      <StatCard
        label="Active Tasks"
        value={48}
      />

      <StatCard
        label="Completed"
        value="76%"
      />
    </div>
  );
};