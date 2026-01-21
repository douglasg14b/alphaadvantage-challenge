import { Card, Text, Group } from '@mantine/core';
import { Sparkline } from '@mantine/charts';
import { useMemo } from 'react';

function generateFauxData(points = 20): number[] {
    let value = 50 + Math.random() * 50;
    const data: number[] = [];
    
    for (let i = 0; i < points; i++) {
        value += (Math.random() - 0.5) * 10;
        value = Math.max(20, Math.min(100, value));
        data.push(value);
    }
    
    return data;
}

export function StockCard() {
    const sparklineData = useMemo(() => generateFauxData(), []);

    return (
        <Card padding="lg">
            <Card.Section>
                <Group justify="space-between" p="md">
                    <Text fw={600}>Ticket Name Here</Text>
                    <Text size="sm" c="dimmed">
                        $123.45
                    </Text>
                </Group>
            </Card.Section>

            <Card.Section p="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Sparkline
                    w="100%"
                    h={50}
                    data={sparklineData}
                    curveType="linear"
                    fillOpacity={0.2}
                    strokeWidth={2}
                />
            </Card.Section>
        </Card>
    );
}
