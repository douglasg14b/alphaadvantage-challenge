let ApiKey = '';

export function setApiKey(apiKey: string) {
    ApiKey = apiKey;
}

export function hasApiKey() {
    return !!ApiKey;
}

export function getApiKey() {
    if (ApiKey) return ApiKey;

    throw new Error('API key not set');
}
