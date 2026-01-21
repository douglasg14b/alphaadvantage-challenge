import { apiCache } from './apiCache';
import type { TopGainersLosersItem, TopGainersLosersResponse } from './models';

const BASE_API_URL = 'https://www.alphavantage.co/query';
export class AlphaAdvantageClient {
    private readonly apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getTopGainersLosers(): Promise<TopGainersLosersResponse> {
        return apiCache.fetch<TopGainersLosersResponse>(BASE_API_URL, {
            function: 'TOP_GAINERS_LOSERS',
            apikey: this.apiKey,
        });
    }

    async getMostActiveStocks(): Promise<TopGainersLosersItem[]> {
        const topGainersLosers = await this.getTopGainersLosers();

        console.log(topGainersLosers);

        return topGainersLosers.most_actively_traded;
    }
}

export const alphaAdvantageClient = new AlphaAdvantageClient('9PRJ9CX3O1NGK3PH');
