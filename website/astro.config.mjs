// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import { loadEnv } from 'payload/node'

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

loadEnv()

export default defineConfig({
  output: 'server',

  adapter: node({
    mode: 'standalone',
  }),

  integrations: [react()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
})