import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChartNoAxesCombined } from "lucide-react";

import { AnalyticsLineChart } from "../features/analytics/components/AnalyticsLineChart";
import { AnalyticsRangeControls } from "../features/analytics/components/AnalyticsRangeControls";
import type {
    AnalyticsDataPoint,
    AnalyticsRange,
    AnalyticsRangeOption,
    ChartMouseEvent,
} from "../features/analytics/types";
import {
    addMonths,
    aggregateByWeek,
    generateAnalyticsData,
    getCurrentMonthStartIndex,
} from "../features/analytics/utils";
import { ModulePage } from "./ModulePage";

const generatedData = generateAnalyticsData();

export const AnalyticsPage = ({
    data = generatedData,
}: {
    data?: AnalyticsDataPoint[];
}) => {
    const { t, i18n } = useTranslation("analytics");
    const [refAreaLeft, setRefAreaLeft] = useState("");
    const [refAreaRight, setRefAreaRight] = useState("");
    const [startIndex, setStartIndex] = useState(() =>
        getCurrentMonthStartIndex(data),
    );
    const [endIndex, setEndIndex] = useState(data.length - 1);
    const [activeRange, setActiveRange] = useState<AnalyticsRange>("month");

    const chartData = data.map((item, index) => ({
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
    const spansFourMonths =
        selectedData.length > 0 &&
        selectedData[selectedData.length - 1].date >=
        addMonths(selectedData[0].date, 4);
    const visibleData = spansFourMonths
        ? aggregateByWeek(selectedData)
        : selectedData;

    const handleRangeSelect = (range: AnalyticsRangeOption) => {
        const lastIndex = data.length - 1;

        if (range === "week") {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const monday = new Date(today);
            const dayOfWeek = monday.getDay() || 7;
            monday.setDate(monday.getDate() - dayOfWeek + 1);
            const firstIndex = data.findIndex((item) => item.date >= monday);
            setStartIndex(firstIndex === -1 ? lastIndex : firstIndex);
        } else if (range === "month") {
            setStartIndex(getCurrentMonthStartIndex(data));
        } else {
            setStartIndex(0);
        }

        setEndIndex(lastIndex);
        setActiveRange(range);
        setRefAreaLeft("");
        setRefAreaRight("");
    };

    const handleMouseDown = (event: ChartMouseEvent) => {
        if (event.activeLabel) setRefAreaLeft(String(event.activeLabel));
    };

    const handleMouseMove = (event: ChartMouseEvent) => {
        if (event.activeLabel && refAreaLeft) {
            setRefAreaRight(String(event.activeLabel));
        }
    };

    const handleMouseUp = () => {
        if (!refAreaLeft || !refAreaRight) {
            setRefAreaLeft("");
            setRefAreaRight("");
            return;
        }

        let leftIndex = visibleData.findIndex((item) => item.name === refAreaLeft);
        let rightIndex = visibleData.findIndex((item) => item.name === refAreaRight);

        if (leftIndex > rightIndex) [leftIndex, rightIndex] = [rightIndex, leftIndex];

        if (leftIndex === rightIndex || leftIndex < 0 || rightIndex < 0) {
            setRefAreaLeft("");
            setRefAreaRight("");
            return;
        }

        setStartIndex(visibleData[leftIndex].startIndex);
        setEndIndex(visibleData[rightIndex].endIndex);
        setActiveRange(null);
        setRefAreaLeft("");
        setRefAreaRight("");
    };

    const selectedFirst = selectedData[0];
    const selectedLast = selectedData[selectedData.length - 1];
    const diff = (selectedLast?.uv ?? 0) - (selectedFirst?.uv ?? 0);
    const percentChange = selectedFirst?.uv
        ? ((diff / selectedFirst.uv) * 100).toFixed(2)
        : "0";
    const changeText = `${diff >= 0 ? "+" : ""}${diff} (${diff >= 0 ? "+" : ""}${percentChange}%)`;

    return (
        <ModulePage
            icon={ChartNoAxesCombined}
            eyebrow={t("progress")}
            title={t("title")}
            description={t("description")}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
        >
            <div className="flex w-full flex-col gap-4">
                <AnalyticsRangeControls
                    period={`${selectedFirst?.name ?? ""} - ${selectedLast?.name ?? ""}`}
                    changeText={changeText}
                    isChangePositive={diff >= 0}
                    activeRange={activeRange}
                    showReset={activeRange === null}
                    labels={{
                        activePeriod: t("activePeriod"),
                        valueChange: t("valueChange"),
                        week: t("week"),
                        month: t("month"),
                        year: t("year"),
                        reset: t("reset"),
                    }}
                    onRangeSelect={handleRangeSelect}
          onReset={() => handleRangeSelect("month")}
                />

                <AnalyticsLineChart
                    data={visibleData}
                    activityLabel={t("activity")}
                    refAreaLeft={refAreaLeft}
                    refAreaRight={refAreaRight}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                />
            </div>
        </ModulePage>
    );
};
