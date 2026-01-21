import { useState } from 'react';
import { hasApiKey, setApiKey } from '../globals';

export function useApiKey() {
    const [hasKey, setHasKey] = useState(hasApiKey());

    const saveApiKey = (apiKey: string) => {
        setApiKey(apiKey);
        setHasKey(true);
    };

    return { hasKey, saveApiKey };
}
