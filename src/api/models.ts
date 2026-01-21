export interface BaseResponse {
    metadata: string;
    last_updated: string;
}

export interface TopGainersLosersItem {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
}

export type TopGainersLosersResponse = BaseResponse & {
    top_gainers: TopGainersLosersItem[];
    top_losers: TopGainersLosersItem[];
    most_actively_traded: TopGainersLosersItem[];
};
