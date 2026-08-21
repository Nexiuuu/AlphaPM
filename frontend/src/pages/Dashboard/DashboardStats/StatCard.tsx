import { Card } from "../../../components/ui/Card/Card";

interface StatCardProps {
    label: string;
    value: string | number;
    isLoading?: boolean;
}

export const StatCard = ({
    label,
    value,
    isLoading = false,
}: StatCardProps) => {
    return (
        <Card className="p-6 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-[var(--color-text-muted)]">
                {label}
            </h3>
            {isLoading ? (
                <div className="h-9 w-16 rounded bg-[var(--color-text-muted)]/20 animate-pulse" />
            ) : (
                <p className="text-3xl font-bold text-[var(--color-text)]">
                    {value}
                </p>
            )}
        </Card>
    );
};