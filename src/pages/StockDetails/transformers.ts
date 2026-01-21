// const tableData = useMemo(() => {
//     if (!data) return [];

import type { TimeSeriesDailyResponse } from '../../api';

interface PriceHistoryRow {
    date: string;
    close: number;
    volume: number;
    changeAmount: number;
    changePercent: string;
}

export function transformPriceHistoryData(
    data: TimeSeriesDailyResponse['Time Series (Daily)'] | undefined,
): PriceHistoryRow[] {
    if (!data) return [];

    const entries = Object.entries(data);

    const rows: PriceHistoryRow[] = entries
        .map(([date, values], index) => {
            const close = parseFloat(values['4. close']);
            const volume = parseInt(values['5. volume'], 10);
            let previousChangePercentage = '---';
            let previousChangeAmount = 0;

            const previousEntry = index < entries.length - 1 ? entries[index + 1][1] : null;

            if (previousEntry) {
                const prevClose = parseFloat(previousEntry['4. close']);
                previousChangeAmount = close - prevClose;
                previousChangePercentage = `${((previousChangeAmount / prevClose) * 100).toFixed(2)}%`;
            }

            return {
                date,
                close,
                volume,
                changePercent: previousChangePercentage,
                changeAmount: previousChangeAmount,
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

    return rows;
}
