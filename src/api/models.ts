export interface RateLimitResponse {
    Information: `We have detected your API key as ${string} and our standard API rate limit is 25 requests per day`;
}

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

export interface TimeSeriesDailyMetaData {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
}

export interface TimeSeriesDailyData {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
}

export interface TimeSeriesDailyResponse {
    'Meta Data': TimeSeriesDailyMetaData;
    'Time Series (Daily)': {
        [date: string]: TimeSeriesDailyData;
    };
}

export interface GlobalQuoteData {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
}

export interface GlobalQuoteResponse {
    'Global Quote': GlobalQuoteData;
}

export interface CompanyOverview {
    Symbol: string;
    AssetType: string;
    Name: string;
    Description: string;
    CIK: string;
    Exchange: string;
    Currency: string;
    Country: string;
    Sector: string;
    Industry: string;
    Address: string;
    FiscalYearEnd: string;
    LatestQuarter: string;
    MarketCapitalization: string;
    EBITDA: string;
    PERatio: string;
    PEGRatio: string;
    BookValue: string;
    DividendPerShare: string;
    DividendYield: string;
    EPS: string;
    RevenuePerShareTTM: string;
    ProfitMargin: string;
    OperatingMarginTTM: string;
    ReturnOnAssetsTTM: string;
    ReturnOnEquityTTM: string;
    RevenueTTM: string;
    GrossProfitTTM: string;
    DilutedEPSTTM: string;
    QuarterlyEarningsGrowthYOY: string;
    QuarterlyRevenueGrowthYOY: string;
    AnalystTargetPrice: string;
    TrailingPE: string;
    ForwardPE: string;
    PriceToSalesRatioTTM: string;
    PriceToBookRatio: string;
    EVToRevenue: string;
    EVToEBITDA: string;
    Beta: string;
    '52WeekHigh': string;
    '52WeekLow': string;
    '50DayMovingAverage': string;
    '200DayMovingAverage': string;
    SharesOutstanding: string;
    DividendDate: string;
    ExDividendDate: string;
}

export function isRateLimitResponse(response: unknown): response is RateLimitResponse {
    return (
        typeof response === 'object' &&
        response !== null &&
        'Information' in response &&
        typeof response.Information === 'string' &&
        response.Information.includes('25 requests per day')
    );
}
