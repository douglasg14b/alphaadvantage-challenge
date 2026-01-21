import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE || '/',
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Only apply manual chunks for client builds (not SSR)
                    // SSR builds will have React as external, so we skip manual chunks
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'react-vendor';
                        }
                        if (id.includes('@mantine/core') || id.includes('@mantine/hooks')) {
                            return 'mantine-vendor';
                        }
                        if (id.includes('framer-motion')) {
                            return 'framer-motion';
                        }
                        if (id.includes('@tabler/icons-react')) {
                            return 'icons';
                        }
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
});
