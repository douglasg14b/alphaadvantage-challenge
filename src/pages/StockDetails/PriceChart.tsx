import { AreaChart } from '@mantine/charts';
import { Group, Loader, Paper, Text } from '@mantine/core';
import { useMemo } from 'react';
import type { TimeSeriesDailyResponse } from '../../api/models';
import { calculateChartRange } from '../../chartUtils';

interface PriceChartProps {
    data: TimeSeriesDailyResponse['Time Series (Daily)'] | undefined;
    isLoading: boolean;
}

export function PriceChart({ data, isLoading }: PriceChartProps) {
    const chartData = useMemo(() => {
        if (!data) return [];

        const entries = Object.entries(data)
            .map(([date, values]) => ({
                date,
                price: parseFloat(values['4. close']),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-90); // Last 90 days

        return entries;
    }, [data]);

    const yAxisRange = useMemo(() => {
        return calculateChartRange(chartData);
    }, [chartData]);

    if (isLoading) {
        return (
            <Group justify="center" h={400}>
                <Loader size="lg" />
            </Group>
        );
    }

    if (!data || chartData.length === 0) {
        return (
            <Paper p="xl" withBorder h={400}>
                <Group justify="center" h="100%">
                    <Text c="dimmed">No price data available</Text>
                </Group>
            </Paper>
        );
    }

    return (
        <AreaChart
            h={400}
            data={chartData}
            dataKey="date"
            series={[{ name: 'price', color: 'blue.6' }]}
            curveType="linear"
            withLegend={false}
            withDots={false}
            gridAxis="xy"
            yAxisProps={{
                domain: [yAxisRange.min, yAxisRange.max],
            }}
        />
    );
}
