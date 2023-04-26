import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import preact from '@astrojs/preact';

import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    preact(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
  output: 'server',
  adapter: vercel({
    analytics: true,
  }),
  vite: {
    define: {
      'import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID': JSON.stringify(
        process.env.VERCEL_ANALYTICS_ID
      ),
    },
  },
});
