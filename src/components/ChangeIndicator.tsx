import { Group, Text } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconMinus } from '@tabler/icons-react';

type ChangeIndicatorProps = {
    changeAmount: string;
    changePercentage: string;
    size?: 'sm' | 'md' | 'lg';
};

function parseChange(value: string): number {
    return Number.parseFloat(value.replace('%', '').replace('$', ''));
}

export function ChangeIndicator({ changeAmount, changePercentage, size = 'md' }: ChangeIndicatorProps) {
    const change = parseChange(changeAmount);
    const isPositive = change > 0;
    const isNegative = change < 0;

    const color = isPositive ? 'teal' : isNegative ? 'red' : 'dimmed';
    const Icon = isPositive ? IconArrowUp : isNegative ? IconArrowDown : IconMinus;

    const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 20;
    const textSize = size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md';

    return (
        <Group gap={4} wrap="nowrap">
            <Icon size={iconSize} color={`var(--mantine-color-${color}-6)`} />
            <Text size={textSize} c={color} fw={500}>
                {isPositive ? '+' : ''}
                {changeAmount}
            </Text>
            <Text size={textSize} c={color}>
                ({changePercentage})
            </Text>
        </Group>
    );
}
