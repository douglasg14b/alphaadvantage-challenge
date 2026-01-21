import { useQuery } from '@tanstack/react-query';
import { alphaAdvantageClient } from '../api';

export function useMostActiveStocks() {
    return useQuery({
        queryKey: ['mostActiveStocks'],
        queryFn: () => alphaAdvantageClient.getMostActiveStocks(),
    });
}
