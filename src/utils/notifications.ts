import { notifications } from '@mantine/notifications';

export function showRateLimitNotification() {
    notifications.show({
        title: 'Rate Limit Hit',
        message: 'API rate limit reached. Switch IPs to continue.',
        color: 'orange',
        autoClose: 2000,
    });
}

export function showFallbackDataUsedNotification() {
    notifications.show({
        title: 'Fallback Data Used',
        message: 'Fallback data used because API rate limit was hit.',
        color: 'yellow',
        autoClose: 2000,
    });
}
