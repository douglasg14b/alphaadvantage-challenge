import Queue from 'p-queue';
import { localStorageCache } from './localStorageCache';

interface CacheEntry<TData> {
    data: TData;
    timestamp: number;
}

// Crazy TTL because.... this is just a test, and the 25r/day is annoying
const DEFAULT_TTL = 12 * 60 * 60 * 1000; // 12 hours

/**
 * A simple response cache for API Requests
 * We're doing this because the API has very low rate limits, and 1-per-second restrictions
 * This is actually leftover from when I was using the real API for our sparklines before I knew of the 25/d limit
 * It's still handy to have regardless with Strict mode anyways, so keeping it
 *
 * Uses localStorage for persistent caching across browser sessions
 */
class ApiCache {
    private queue: Queue;

    constructor() {
        // Rate limit: 1 request per second (interval between requests)
        this.queue = new Queue({
            concurrency: 1,
            interval: 1000,
            intervalCap: 1,
        });
    }

    private getCacheKey(url: string, params?: Record<string, string>): string {
        const sortedParams = params
            ? Object.entries(params)
                  .filter(([k]) => k !== 'apikey') // Exclude API key from cache key
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([k, v]) => `${k}=${v}`)
                  .join('&')
            : '';
        return `${url}?${sortedParams}`;
    }

    private isValid<TData>(entry: CacheEntry<TData> | undefined, ttl: number): entry is CacheEntry<TData> {
        if (!entry) return false;
        return Date.now() - entry.timestamp < ttl;
    }

    async fetch<TData>(
        url: string,
        fetcher: (url: string, params?: Record<string, string>) => Promise<TData>,
        params?: Record<string, string>,
    ): Promise<TData> {
        const cacheKey = this.getCacheKey(url, params);

        // Check localStorage cache
        const cached = localStorageCache.get<TData>(cacheKey) ?? undefined;
        if (this.isValid(cached, DEFAULT_TTL)) {
            return cached.data;
        }

        // Queue the request to respect rate limits
        return this.queue.add(async () => {
            // Double-check cache (another request might have populated it while waiting)
            const rechecked = localStorageCache.get<TData>(cacheKey) ?? undefined;
            if (this.isValid(rechecked, DEFAULT_TTL)) {
                return rechecked.data;
            }

            // Call fetcher callback
            const data = await fetcher(url, params);

            const entry: CacheEntry<TData> = {
                data,
                timestamp: Date.now(),
            };

            // Do not cache or use empty objects, strings, or arrays
            if (
                data === null ||
                data === undefined ||
                data === '' ||
                (Array.isArray(data) && data.length === 0) ||
                Object.keys(data).length === 0
            ) {
                throw new Error('Data is empty');
            }

            // Store in localStorage
            localStorageCache.set(cacheKey, entry);

            return data;
        }) as Promise<TData>;
    }

    invalidate(url: string, params?: Record<string, string>): void {
        const cacheKey = this.getCacheKey(url, params);
        localStorageCache.remove(cacheKey);
    }

    clearAll(): void {
        localStorageCache.clear();
    }

    get pendingRequests(): number {
        return this.queue.pending;
    }

    get cacheSize(): number {
        return localStorageCache.getSize();
    }
}

// Export a singleton instance
export const apiCache = new ApiCache();
