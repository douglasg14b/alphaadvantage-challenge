interface CacheEntry<TData = unknown> {
    data: TData;
    timestamp: number;
}

/**
 * Standalone localStorage service for persisting cache entries
 * We're storing in localstorage to avoid blowing through the daily APi rate limit
 */
export class LocalStorageCache {
    private readonly namespace: string;

    constructor(namespace = 'api-cache') {
        this.namespace = namespace;
    }

    get<TData>(key: string): CacheEntry<TData> | null {
        try {
            const storageKey = this.getStorageKey(key);
            const item = localStorage.getItem(storageKey);

            if (!item) {
                return null;
            }

            return JSON.parse(item) as CacheEntry<TData>;
        } catch (error) {
            console.warn(`[LocalStorageCache] Failed to get item "${key}":`, error);
            return null;
        }
    }

    set<TData>(key: string, entry: CacheEntry<TData>): void {
        try {
            const storageKey = this.getStorageKey(key);
            const serialized = typeof entry === 'string' ? entry : JSON.stringify(entry);
            localStorage.setItem(storageKey, serialized);
        } catch (error) {
            console.warn(`[LocalStorageCache] Failed to set item "${key}":`, error);
        }
    }

    remove(key: string): void {
        try {
            const storageKey = this.getStorageKey(key);
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.warn(`[LocalStorageCache] Failed to remove item "${key}":`, error);
        }
    }

    clear(): void {
        try {
            const keys = this.getAllKeys();
            keys.forEach((key) => {
                localStorage.removeItem(key);
            });
        } catch (error) {
            console.warn(`[LocalStorageCache] Failed to clear cache:`, error);
        }
    }

    getAllKeys(): string[] {
        try {
            const keys: string[] = [];
            const prefix = `${this.namespace}:`;

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith(prefix)) {
                    keys.push(key);
                }
            }

            return keys;
        } catch (error) {
            console.warn(`[LocalStorageCache] Failed to get all keys:`, error);
            return [];
        }
    }

    getSize(): number {
        return this.getAllKeys().length;
    }

    private getStorageKey(key: string): string {
        return `${this.namespace}:${key}`;
    }
}

export const localStorageCache = new LocalStorageCache();
