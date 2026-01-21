import { Stack, Text } from '@mantine/core';
import type { CompanyOverview } from '../../api/models';
import { coalesceValue, formatMarketCap } from './formatter';

interface CompanyInfoProps {
    company: CompanyOverview;
}

export function CompanyInfo({ company }: CompanyInfoProps) {
    return (
        <Stack gap="md">
            <InfoField label="Asset Type" value={coalesceValue(company.AssetType)} />
            <InfoField label="Exchange" value={coalesceValue(company.Exchange)} />
            <InfoField label="Sector" value={coalesceValue(company.Sector)} />
            <InfoField label="Industry" value={coalesceValue(company.Industry)} />
            <InfoField label="Market Capitalization" value={formatMarketCap(company.MarketCapitalization)} />
        </Stack>
    );
}

interface InfoFieldProps {
    label: string;
    value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
    return (
        <div>
            <Text size="md" fw={600} c="dimmed" tt="uppercase" mb={4}>
                {label}
            </Text>
            <Text size="lg">{value}</Text>
        </div>
    );
}
