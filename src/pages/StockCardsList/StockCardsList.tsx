import { Alert, Center, Grid, Loader } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useMostActiveStocks } from '../../hooks';
import { StockCard } from './StockCard';

export function StockCardsList() {
    const { data: mostActiveStocks, isLoading, isError, error } = useMostActiveStocks();

    if (isLoading) {
        return (
            <Center h={200}>
                <Loader size="lg" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Alert icon={<IconAlertCircle size={16} />} title="Error loading stocks" color="red">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </Alert>
        );
    }

    if (!mostActiveStocks?.length) {
        return (
            <Alert title="No data" color="yellow">
                No active stocks found.
            </Alert>
        );
    }

    return (
        <Grid gutter="md">
            {mostActiveStocks.map((stock) => (
                <Grid.Col key={stock.ticker} span={{ base: 12, md: 4, lg: 4, sm: 6, xs: 12 }}>
                    <StockCard
                        ticker={stock.ticker}
                        price={stock.price}
                        changeAmount={stock.change_amount}
                        changePercentage={stock.change_percentage}
                    />
                </Grid.Col>
            ))}
        </Grid>
    );
}
