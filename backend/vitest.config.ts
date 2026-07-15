import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'src/database/seeds/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@config': path.resolve(__dirname, './src/config'),
      '@common': path.resolve(__dirname, './src/common'),
      '@database': path.resolve(__dirname, './src/database'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@integrations': path.resolve(__dirname, './src/integrations'),
    },
  },
});
