import { Sparkline } from '@mantine/charts';
import { Alert, Center, Loader, useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useTimeSeriesDaily, useTimeSeriesDailyFake } from '../../hooks';

interface StockCardSparklineProps {
    ticker: string;
    isPositive: boolean;
}

export function StockCardSparkline({ ticker, isPositive }: StockCardSparklineProps) {
    const theme = useMantineTheme();
    const { data: timeSeriesDaily, isLoading, isError, error } = useTimeSeriesDaily(ticker);
    const { data: timeSeriesDailyFake, isLoading: isLoadingFake } = useTimeSeriesDailyFake(ticker);

    const sparklineData = useMemo(() => {
        const data = Object.entries(timeSeriesDaily ?? {});

        // Data doesn't come in sorted, we must sort it ourselves
        // This API is a disappointment
        return data
            .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
            .map((item) => Number.parseFloat(item[1]['4. close']));
    }, [timeSeriesDaily]);

    const sparklineColor = isPositive ? theme.colors.teal[6] : theme.colors.red[6];

    if (isLoading || isLoadingFake) {
        return (
            <Center>
                <Loader size="sm" />
            </Center>
        );
    }

    if (isError && !timeSeriesDailyFake) {
        return (
            <Alert color="red" title="Error loading sparkline">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </Alert>
        );
    }

    return (
        <Sparkline
            w="100%"
            h={60}
            data={sparklineData ?? []}
            curveType="natural"
            color={sparklineColor}
            fillOpacity={0.15}
            strokeWidth={2}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
        />
    );
}
