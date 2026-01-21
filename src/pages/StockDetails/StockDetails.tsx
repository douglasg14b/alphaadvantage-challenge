import { Alert, Button, Container, Grid, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompanyOverview, useQuote, useTimeSeriesDaily } from '../../hooks';
import { CompanyInfo } from './CompanyInfo';
import { coalesceValue } from './formatter';
import { PriceChart } from './PriceChart';
import { PriceHistoryTable } from './PriceHistoryTable';
import { QuoteInfo } from './QuoteInfo';

export function StockDetails() {
    const { ticker } = useParams<{ ticker: string }>();
    const navigate = useNavigate();
    const { data: company, isLoading: isLoadingCompany, error: companyError } = useCompanyOverview(ticker || '');
    const { data: priceData, isLoading: isLoadingPrices } = useTimeSeriesDaily(ticker || '', 'compact');
    const { data: quote, isLoading: isLoadingQuote } = useQuote(ticker || '');

    const isLoading = isLoadingCompany;

    return (
        <Container size="xl">
            <Stack gap="md">
                <Button
                    leftSection={<IconArrowLeft size={16} />}
                    variant="subtle"
                    onClick={() => navigate('/')}
                    w="fit-content"
                >
                    Back to List
                </Button>

                {isLoading && (
                    <Paper shadow="sm" p="xl" withBorder>
                        <Group justify="center">
                            <Loader size="lg" />
                        </Group>
                    </Paper>
                )}

                {companyError && (
                    <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                        Failed to load company details. Please try again.
                    </Alert>
                )}

                {company && !isLoading && (
                    <Stack gap="md">
                        <Paper shadow="sm" p="xl" withBorder>
                            <Stack gap="lg">
                                <Group justify="space-between" align="flex-start" wrap="wrap">
                                    <div>
                                        <Title order={1} mb="xs">
                                            {coalesceValue(company.Name)}
                                        </Title>
                                        <Text size="xl" c="dimmed" fw={500}>
                                            {coalesceValue(company.Symbol)}
                                        </Text>
                                    </div>

                                    <QuoteInfo quote={quote} isLoading={isLoadingQuote} />
                                </Group>

                                <Grid gutter="xl">
                                    <Grid.Col span={{ base: 12, md: 3, sm: 3 }}>
                                        <CompanyInfo company={company} />
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, md: 9, sm: 9 }}>
                                        <PriceChart data={priceData} isLoading={isLoadingPrices} />
                                    </Grid.Col>
                                </Grid>
                            </Stack>
                        </Paper>

                        <Paper shadow="sm" p="xl" withBorder>
                            <Stack gap="sm">
                                <Text size="sm" fw={600} c="dimmed" tt="uppercase">
                                    Description
                                </Text>
                                <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
                                    {coalesceValue(company.Description)}
                                </Text>
                            </Stack>
                        </Paper>

                        <PriceHistoryTable data={priceData} isLoading={isLoadingPrices} />
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}
