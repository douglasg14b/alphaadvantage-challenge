import { useQuery } from '@tanstack/react-query';
import { getAlphaAdvantageClient } from '../api';
import { getApiKey, hasApiKey } from '../globals';

export function useQuote(symbol: string) {
    return useQuery({
        queryKey: ['quote', symbol],
        queryFn: () => getAlphaAdvantageClient(getApiKey()).getQuote(symbol),
        enabled: hasApiKey() && !!symbol,
    });
}
