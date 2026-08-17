import { StatCard } from "./StatCard";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard
        label="Total Projects"
        value={12}
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