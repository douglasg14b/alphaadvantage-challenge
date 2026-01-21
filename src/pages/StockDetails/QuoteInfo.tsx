import { Group, Loader, Stack, Text } from '@mantine/core';
import type { GlobalQuoteData } from '../../api/models';
import { ChangeIndicator } from '../../components/ChangeIndicator';

type QuoteInfoProps = {
    quote: GlobalQuoteData | undefined;
    isLoading: boolean;
};

export function QuoteInfo({ quote, isLoading }: QuoteInfoProps) {
    if (isLoading) {
        return (
            <Group>
                <Loader size="sm" />
            </Group>
        );
    }

    if (!quote) {
        return null;
    }

    return (
        <Stack gap="xs" align="flex-end">
            <Group gap="md" align="baseline">
                <Text size="2.5rem" fw={700} lh={1}>
                    ${parseFloat(quote['05. price']).toFixed(2)}
                </Text>
                <ChangeIndicator
                    changeAmount={quote['09. change']}
                    changePercentage={quote['10. change percent']}
                    size="lg"
                />
            </Group>
            <Group gap="xl">
                <div>
                    <Text size="xs" c="dimmed" tt="uppercase">
                        Volume
                    </Text>
                    <Text size="md" fw={600}>
                        {parseInt(quote['06. volume']).toLocaleString()}
                    </Text>
                </div>
                <div>
                    <Text size="xs" c="dimmed" tt="uppercase">
                        Previous Close
                    </Text>
                    <Text size="md" fw={600}>
                        ${parseFloat(quote['08. previous close']).toFixed(2)}
                    </Text>
                </div>
            </Group>
        </Stack>
    );
}
