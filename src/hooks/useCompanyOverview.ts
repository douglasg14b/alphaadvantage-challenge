import { useQuery } from '@tanstack/react-query';
import { getAlphaAdvantageClient } from '../api';
import { getApiKey, hasApiKey } from '../globals';

export function useCompanyOverview(symbol: string) {
    return useQuery({
        queryKey: ['companyOverview', symbol],
        queryFn: () => getAlphaAdvantageClient(getApiKey()).getCompanyOverview(symbol),
        enabled: hasApiKey(),
    });
}
