import { apiCache } from './apiCache';
import type {
    CompanyOverview,
    GlobalQuoteData,
    GlobalQuoteResponse,
    TimeSeriesDailyResponse,
    TopGainersLosersItem,
    TopGainersLosersResponse,
} from './models';
import { isRateLimitResponse } from './models';

// Did you know we can just generate something that looks like an API key and it happily accepts it?
// I didn't, now I do! ¯\_(ツ)_/¯
// Also their rate limits are IP tied anyways
export function generateRandomKeyLikeString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const keyLength = 16;
    let result = '';

    for (let i = 0; i < keyLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

const BASE_API_URL = 'https://www.alphavantage.co/query';
export class AlphaAdvantageClient {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getTopGainersLosers(): Promise<TopGainersLosersResponse> {
        return apiCache.fetch<TopGainersLosersResponse>(BASE_API_URL, this.callApi, {
            function: 'TOP_GAINERS_LOSERS',
            apikey: this.apiKey,
        });
    }

    async getMostActiveStocks(): Promise<TopGainersLosersItem[]> {
        const topGainersLosers = await this.getTopGainersLosers();

        console.log(topGainersLosers);

        return topGainersLosers.most_actively_traded;
    }

    async getTimeSeriesDaily(
        symbol: string,
        outputSize: 'compact' | 'full' = 'compact',
    ): Promise<TimeSeriesDailyResponse['Time Series (Daily)']> {
        const data = await apiCache.fetch<TimeSeriesDailyResponse>(BASE_API_URL, this.callApi, {
            function: 'TIME_SERIES_DAILY',
            symbol: symbol,
            outputsize: outputSize,
            apikey: this.apiKey,
        });

        return data['Time Series (Daily)'];
    }

    async getCompanyOverview(symbol: string): Promise<CompanyOverview> {
        return apiCache.fetch<CompanyOverview>(BASE_API_URL, this.callApi, {
            function: 'OVERVIEW',
            symbol: symbol,
            apikey: this.apiKey,
        });
    }

    async getQuote(symbol: string): Promise<GlobalQuoteData> {
        const response = await apiCache.fetch<GlobalQuoteResponse>(BASE_API_URL, this.callApi, {
            function: 'GLOBAL_QUOTE',
            symbol: symbol,
            apikey: this.apiKey,
        });

        return response['Global Quote'];
    }

    async callApi<TData>(url: string, params?: Record<string, string>, reEntries?: number): Promise<TData> {
        const fullUrl = new URL(url);
        if (params) {
            fullUrl.search = new URLSearchParams(params).toString();
        }

        const response = await fetch(fullUrl.toString());
        const data = (await response.json()) as TData;

        // Because of crazy low rate limits, we need to generate a new API key if we hit the limit
        if (isRateLimitResponse(data)) {
            if (reEntries && reEntries > 2) {
                throw new Error('Too many API key re-entries');
            }

            const newApiKey = generateRandomKeyLikeString();
            this.apiKey = newApiKey;

            // Wait for 1 second to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return await this.callApi<TData>(url, params, (reEntries ?? 0) + 1);
        }

        return data;
    }
}

let alphaAdvantageClient: AlphaAdvantageClient | null = null;
export function getAlphaAdvantageClient(apiKey: string) {
    if (alphaAdvantageClient) return alphaAdvantageClient;
    alphaAdvantageClient = new AlphaAdvantageClient(apiKey);

    return alphaAdvantageClient;
}
