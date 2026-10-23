import { ChartNoAxesCombined } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceArea } from 'recharts';
import { ModulePage } from "./ModulePage";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type RangeType = "week" | "month" | "year" | null;
type ChartMouseEvent = { activeLabel?: string | number };

type AnalyticsDataPoint = { date: Date; uv: number };
type ChartDataPoint = AnalyticsDataPoint & {
    name: string;
    startIndex: number;
    endIndex: number;
};

const aggregateByWeek = (points: ChartDataPoint[]): ChartDataPoint[] => {
    const weeks = new Map<number, ChartDataPoint[]>();

    points.forEach((point) => {
        const weekStart = new Date(point.date);
        weekStart.setHours(0, 0, 0, 0);
        const dayOfWeek = weekStart.getDay() || 7;
        weekStart.setDate(weekStart.getDate() - dayOfWeek + 1);

        const weekKey = weekStart.getTime();
        const weekPoints = weeks.get(weekKey) ?? [];
        weekPoints.push(point);
        weeks.set(weekKey, weekPoints);
    });

    return Array.from(weeks.values(), (weekPoints) => {
        const firstPoint = weekPoints[0];
        const lastPoint = weekPoints[weekPoints.length - 1];
        const average = weekPoints.reduce((sum, point) => sum + point.uv, 0) / weekPoints.length;

        return {
            ...firstPoint,
            name: `${firstPoint.name} – ${lastPoint.name}`,
            uv: Math.round(average),
            endIndex: lastPoint.endIndex,
        };
    });
};

const generatedData: AnalyticsDataPoint[] = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (364 - i));
    const day = i + 1;
    const base = 2500 + Math.sin(day / 50) * 400 - Math.cos(day / 30) * 200;
    let dipEffect = 0;
    if (day >= 170 && day <= 220) {
        dipEffect = -350 * Math.sin(((day - 170) / 50) * Math.PI);
    }
    const value = Math.round(base + dipEffect + (Math.random() * 40 - 20));
    return {
        date,
        uv: value < 500 ? 500 : value
    };
});

export const AnalyticsPage = ({ data = generatedData }: { data?: AnalyticsDataPoint[] }) => {
    const { t, i18n } = useTranslation("analytics");

    const [refAreaLeft, setRefAreaLeft] = useState('');
    const [refAreaRight, setRefAreaRight] = useState('');

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(data.length - 1);

    const [activeRange, setActiveRange] = useState<RangeType>('year');

    const chartData: ChartDataPoint[] = data.map((item, index) => ({
        ...item,
        name: item.date.toLocaleDateString(i18n.language, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }),
        startIndex: index,
        endIndex: index,
    }));
    const selectedData = chartData.slice(startIndex, endIndex + 1);
    const visibleData = activeRange === "year" ? aggregateByWeek(selectedData) : selectedData;

    const handleRangeSelect = (type: Exclude<RangeType, null>) => {
        const lastIndex = data.length - 1;
        setActiveRange(type);

        if (type === 'week') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const monday = new Date(today);
            const dayOfWeek = monday.getDay() || 7;
            monday.setDate(monday.getDate() - dayOfWeek + 1);
            const firstIndex = data.findIndex((item) => item.date >= monday);
            setStartIndex(firstIndex === -1 ? lastIndex : firstIndex);
            setEndIndex(lastIndex);
        } else if (type === 'month') {
            const firstDayOfMonth = new Date();
            firstDayOfMonth.setDate(1);
            firstDayOfMonth.setHours(0, 0, 0, 0);
            const firstIndex = data.findIndex((item) => item.date >= firstDayOfMonth);
            setStartIndex(firstIndex === -1 ? lastIndex : firstIndex);
            setEndIndex(lastIndex);
        } else if (type === 'year') {
            setStartIndex(0);
            setEndIndex(lastIndex);
        }
        setRefAreaLeft('');
        setRefAreaRight('');
    };

    const handleMouseDown = (e: ChartMouseEvent) => {
        if (e && e.activeLabel) {
            setRefAreaLeft(String(e.activeLabel));
        }
    };

    const handleMouseMove = (e: ChartMouseEvent) => {
        if (e && e.activeLabel && refAreaLeft) {
            setRefAreaRight(String(e.activeLabel));
        }
    };

    const handleMouseUp = () => {
        if (!refAreaLeft || !refAreaRight) {
            setRefAreaLeft('');
            setRefAreaRight('');
            return;
        }

        let leftIndex = visibleData.findIndex(item => item.name === refAreaLeft);
        let rightIndex = visibleData.findIndex(item => item.name === refAreaRight);

        if (leftIndex > rightIndex) {
            [leftIndex, rightIndex] = [rightIndex, leftIndex];
        }

        if (leftIndex === rightIndex) {
            setRefAreaLeft('');
            setRefAreaRight('');
            return;
        }

        setRefAreaLeft('');
        setRefAreaRight('');
        setStartIndex(visibleData[leftIndex].startIndex);
        setEndIndex(visibleData[rightIndex].endIndex);
        setActiveRange(null);
    };

    const handleReset = () => {
        handleRangeSelect('year');
    };

    const firstItem = selectedData[0]?.uv || 0;
    const lastItem = selectedData[selectedData.length - 1]?.uv || 0;
    const diff = lastItem - firstItem;
    const percentChange = firstItem !== 0 ? ((diff / firstItem) * 100).toFixed(2) : 0;

    return (
        <ModulePage
            icon={ChartNoAxesCombined}
            eyebrow={t("progress")}
            title={t("title")}
            description={t("description")}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
        >
            <div className="flex flex-col gap-4 w-full">
                <div className="
                    flex 
                    flex-col 
                    flex-wrap 
                    items-start 
                    justify-between 
                    gap-4 
                    rounded-[var(--radius-md)] 
                    border 
                    border-[var(--color-border)] 
                    bg-[var(--color-surface)] 
                    p-4 
                    text-[var(--color-text)] 
                    shadow-[var(--shadow-sm)] 
                    sm:flex-row sm:items-center sm:p-5
                    "
                >
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <div>
                            <span className="mb-1 block text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t("activePeriod")}</span>
                            <span className="text-sm font-semibold">
                                {selectedData[0]?.name} – {selectedData[selectedData.length - 1]?.name}
                            </span>
                        </div>
                        <div>
                            <span className="mb-1 block text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t("valueChange")}</span>
                            <span className={`text-sm font-bold ${diff >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                                {diff >= 0 ? `+${diff}` : diff} ({diff >= 0 ? `+${percentChange}%` : `${percentChange}%`})
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-1">
                            <button
                                onClick={() => handleRangeSelect('week')}
                                className={`
                                    rounded-md 
                                    px-3 
                                    py-1 
                                    text-xs 
                                    font-medium 
                                    transition-colors 
                                    ${activeRange === 'week' ?
                                        'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                                        :
                                        'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'
                                    }`}
                            >
                                {t("week")}
                            </button>
                            <button
                                onClick={() => handleRangeSelect('month')}
                                className={`
                                    rounded-md 
                                    px-3 
                                    py-1 
                                    text-xs 
                                    font-medium 
                                    transition-colors 
                                    ${activeRange === 'month' ?
                                        'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                                        :
                                        'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'
                                    }`}
                            >
                                {t("month")}
                            </button>
                            <button
                                onClick={() => handleRangeSelect('year')}
                                className={`
                                    rounded-md 
                                    px-3 
                                    py-1 
                                    text-xs 
                                    font-medium 
                                    transition-colors 
                                    ${activeRange === 'year' ?
                                        'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                                        :
                                        'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'
                                    }`}
                            >
                                {t("year")}
                            </button>
                        </div>

                        {(startIndex !== 0 || endIndex !== data.length - 1) && (
                            <button
                                onClick={handleReset}
                                className="
                                    rounded-lg 
                                    border 
                                    border-[var(--color-border)] 
                                    bg-[var(--color-surface)] 
                                    px-3 
                                    py-1.5 
                                    text-xs 
                                    text-[var(--color-primary)] 
                                    transition-colors 
                                    hover:bg-[var(--color-surface-hover)]
                                "
                            >
                                {t("reset")}
                            </button>
                        )}
                    </div>
                </div>

                <div className="
                    outline-none 
                    select-none
                    focus:outline-none 
                    [&_*]:outline-none 
                    w-full 
                    min-w-0
                    h-[22rem] 
                    sm:h-[26rem] 
                    md:h-[32rem]
                    "
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={visibleData}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                        >
                            <CartesianGrid
                                stroke="var(--color-border)"
                                strokeOpacity={0.18}
                                strokeDasharray="3 3"
                            />
                            <XAxis dataKey="name" stroke="var(--color-text-disabled)" tick={false} />
                            <YAxis stroke="var(--color-text-disabled)" domain={['auto', 'auto']} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface)',
                                    borderColor: 'var(--color-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--color-text)',
                                    boxShadow: 'var(--shadow-md)',
                                }}
                                labelStyle={{ color: 'var(--color-text-muted)' }}
                                itemStyle={{ color: 'var(--color-primary)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                name={t("activity")}
                                stroke="var(--color-primary)"
                                strokeWidth={2}
                                dot={(props) => {
                                    const { cx, cy, index } = props;
                                    if (index % 5 === 0) {
                                        return (
                                            <circle
                                                key={`dot-${index}`}
                                                cx={cx}
                                                cy={cy}
                                                r={3.5}
                                                fill="var(--color-primary)"
                                                stroke="var(--color-surface)"
                                                strokeWidth={1.5}
                                            />
                                        );
                                    }
                                    return null;
                                }}
                            />
                            {refAreaLeft && refAreaRight && (
                                <ReferenceArea
                                    x1={refAreaLeft}
                                    x2={refAreaRight}
                                    strokeOpacity={0.3}
                                    fill="var(--color-primary)"
                                    fillOpacity={0.16}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </ModulePage>
    );
};
