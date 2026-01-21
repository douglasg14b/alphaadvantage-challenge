import { useQuery } from '@tanstack/react-query';
import { getAlphaAdvantageClient } from '../api';
import { getApiKey, hasApiKey } from '../globals';

export function useTimeSeriesDaily(symbol: string, outputSize: 'compact' | 'full' = 'compact') {
    return useQuery({
        queryKey: ['timeSeriesDaily', symbol, outputSize],
        queryFn: () => getAlphaAdvantageClient(getApiKey()).getTimeSeriesDaily(symbol, outputSize),
        enabled: hasApiKey() && !!symbol,
    });
}
