import { Card } from "../../../components/ui/Card/Card";

interface StatCardProps {
    label: string;
    value: string | number;
}

export const StatCard = ({
    label,
    value,
}: StatCardProps) => {
    return (
        <Card className="p-6 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-[var(--color-text-muted)]">
                {label}
            </h3>
            <p className="text-3xl font-bold text-[var(--color-text)]">
                {value}
            </p>
        </Card>
    );
};
