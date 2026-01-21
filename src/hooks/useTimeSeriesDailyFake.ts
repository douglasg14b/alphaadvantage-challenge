import { useQuery } from '@tanstack/react-query';

function generateFakeData(): number[] {
    const data: number[] = [];
    let price = 100 + Math.random() * 400; // Start between $100-$500

    for (let i = 0; i < 100; i++) {
        // Random walk: -3% to +3% daily change
        const change = (Math.random() - 0.5) * 0.06 * price;
        price = Math.max(price + change, 1);
        data.push(Number(price.toFixed(2)));
    }

    return data;
}

// We could use real data here, but API limits of alpha advantage make it impractical.
export function useTimeSeriesDailyFake(symbol: string) {
    return useQuery({
        queryKey: ['timeSeriesDailyFake', symbol],
        queryFn: async () => {
            // Random delay between 500ms and 3000ms
            const delay = 500 + Math.random() * 2500;
            await new Promise((resolve) => setTimeout(resolve, delay));
            return generateFakeData();
        },
        enabled: !!symbol,
    });
}
