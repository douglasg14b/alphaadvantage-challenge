import Queue from 'p-queue';

interface CacheEntry<TData> {
    data: TData;
    timestamp: number;
}

interface CacheOptions {
    ttl?: number;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * A simple response cache for API Requests
 */
class ApiCache {
    private cache = new Map<string, CacheEntry<unknown>>();
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

    async fetch<TData>(url: string, params?: Record<string, string>, options: CacheOptions = {}): Promise<TData> {
        const { ttl = DEFAULT_TTL } = options;
        const cacheKey = this.getCacheKey(url, params);

        // Check cache first
        const cached = this.cache.get(cacheKey) as CacheEntry<TData> | undefined;
        if (this.isValid(cached, ttl)) {
            console.log(`[ApiCache] Cache hit for: ${cacheKey}`);
            return cached.data;
        }

        // Queue the request to respect rate limits
        return this.queue.add(async () => {
            // Double-check cache (another request might have populated it while waiting)
            const rechecked = this.cache.get(cacheKey) as CacheEntry<TData> | undefined;
            if (this.isValid(rechecked, ttl)) {
                return rechecked.data;
            }

            const fullUrl = new URL(url);
            if (params) {
                fullUrl.search = new URLSearchParams(params).toString();
            }

            const response = await fetch(fullUrl.toString());
            const data = (await response.json()) as TData;

            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now(),
            });

            return data;
        }) as Promise<TData>;
    }

    invalidate(url: string, params?: Record<string, string>): void {
        const cacheKey = this.getCacheKey(url, params);
        this.cache.delete(cacheKey);
    }

    clearAll(): void {
        this.cache.clear();
    }

    get pendingRequests(): number {
        return this.queue.pending;
    }

    get cacheSize(): number {
        return this.cache.size;
    }
}

// Export a singleton instance
export const apiCache = new ApiCache();
