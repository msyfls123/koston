// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import { loadEnv } from 'payload/node'

import react from '@astrojs/react';

loadEnv()

export default defineConfig({
  output: 'server',

  adapter: node({
    mode: 'standalone',
  }),

  integrations: [react()],
})