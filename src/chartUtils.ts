// Chart range being from 0 -> 100 looks crappy
// Instead we calculate the data range and give it some padding for a better visualization
export function calculateChartRange(data: { price: number }[], paddingPercent = 5) {
    if (!data || data.length === 0) {
        return { min: 0, max: 100 };
    }

    const prices = data.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const range = maxPrice - minPrice;
    const padding = range * (paddingPercent / 100);

    return {
        min: Math.floor(minPrice - padding),
        max: Math.ceil(maxPrice + padding),
    };
}
