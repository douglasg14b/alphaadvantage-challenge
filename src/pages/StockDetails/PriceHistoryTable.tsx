import { Group, Loader, Paper, Table, Text } from '@mantine/core';
import { useMemo } from 'react';
import type { TimeSeriesDailyResponse } from '../../api/models';
import { ChangeIndicator } from '../../components';
import { formatCurrency, formatDate, formatVolume } from './formatter';
import { transformPriceHistoryData } from './transformers';

interface PriceHistoryTableProps {
    data: TimeSeriesDailyResponse['Time Series (Daily)'] | undefined;
    isLoading: boolean;
}

export function PriceHistoryTable({ data, isLoading }: PriceHistoryTableProps) {
    const tableData = useMemo(() => transformPriceHistoryData(data), [data]);

    if (isLoading) {
        return (
            <Paper shadow="sm" p="xl" withBorder>
                <Group justify="center">
                    <Loader size="lg" />
                </Group>
            </Paper>
        );
    }

    if (!data || tableData.length === 0) {
        return (
            <Paper shadow="sm" p="xl" withBorder>
                <Group justify="center">
                    <Text c="dimmed">No price history available</Text>
                </Group>
            </Paper>
        );
    }

    return (
        <Paper shadow="sm" withBorder>
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Date</Table.Th>
                        <Table.Th style={{ textAlign: 'right' }}>Close Price</Table.Th>
                        <Table.Th style={{ textAlign: 'right' }}>Volume</Table.Th>
                        <Table.Th style={{ textAlign: 'right' }}>Change</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {tableData.map((row) => (
                        <Table.Tr key={row.date}>
                            <Table.Td>{formatDate(row.date)}</Table.Td>
                            <Table.Td style={{ textAlign: 'right' }}>{formatCurrency(row.close)}</Table.Td>
                            <Table.Td style={{ textAlign: 'right' }}>{formatVolume(row.volume)}</Table.Td>
                            <Table.Td>
                                <Group justify="flex-end">
                                    {row.changePercent !== null ? (
                                        <ChangeIndicator
                                            changeAmount={formatCurrency(row.changeAmount)}
                                            changePercentage={row.changePercent}
                                        />
                                    ) : (
                                        <Text size="sm" c="dimmed">
                                            N/A
                                        </Text>
                                    )}
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Paper>
    );
}
