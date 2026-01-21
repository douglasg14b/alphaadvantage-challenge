export function coalesceValue(value: string | undefined) {
    return value && value !== '' ? value : 'N/A';
}

export function formatMarketCap(value: string | undefined) {
    if (!value || value === '' || value === 'None') return 'N/A';
    const num = parseFloat(value);
    if (isNaN(num)) return 'N/A';

    // Convert to billions/millions for readability
    if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatVolume(value: number) {
    return new Intl.NumberFormat('en-US').format(value);
}

export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
