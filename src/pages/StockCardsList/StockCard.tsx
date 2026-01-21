import { Card, Group, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ChangeIndicator } from '../../components';
import { StockCardSparkline } from './StockCardSparkline';

type StockCardProps = {
    ticker: string;
    price: string;
    changeAmount: string;
    changePercentage: string;
};

export function StockCard({ ticker, price, changeAmount, changePercentage }: StockCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/ticker/${ticker}`);
    };

    return (
        <Card
            padding="lg"
            withBorder
            onClick={handleClick}
            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
            }}
        >
            <Stack gap="sm">
                <Group justify="space-between" align="flex-start">
                    <Text fw={700} size="lg">
                        {ticker}
                    </Text>
                    <Stack gap={2} align="flex-end">
                        <Text fw={600} size="xl">
                            ${price}
                        </Text>
                        <ChangeIndicator changeAmount={changeAmount} changePercentage={changePercentage} size="sm" />
                    </Stack>
                </Group>

                <StockCardSparkline ticker={ticker} isPositive={Number.parseFloat(changeAmount) >= 0} />
            </Stack>
        </Card>
    );
}
