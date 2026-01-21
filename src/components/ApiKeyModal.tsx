import { Button, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { generateRandomKeyLikeString } from '../api';

type ApiKeyModalProps = {
    opened: boolean;
    onSubmit: (apiKey: string) => void;
};

export function ApiKeyModal({ opened, onSubmit }: ApiKeyModalProps) {
    const [apiKey, setApiKey] = useState(generateRandomKeyLikeString());

    const handleSubmit = () => {
        if (apiKey.trim()) {
            onSubmit(apiKey.trim());
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={() => {
                // Modal cannot be closed without entering API key
            }}
            title="Enter API Key"
            closeOnClickOutside={false}
            closeOnEscape={false}
            withCloseButton={false}
        >
            <Stack gap="md">
                <Text size="sm">
                    Please enter your Alpha Vantage API key to continue.
                    <br />
                    One has been generated for you, or you can use your own.
                </Text>
                <TextInput
                    label="API Key"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    autoFocus
                />
                <Button onClick={handleSubmit} disabled={!apiKey.trim()}>
                    Continue
                </Button>
            </Stack>
        </Modal>
    );
}
