import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { linterPlugin, EsLinter, TypeScriptLinter } from 'vite-plugin-linter';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    // linterPlugin({
    //   include: ['./src/**/*.ts', './src/**/*.tsx'],
    //   linters: [new EsLinter(), new TypeScriptLinter()],
    // }),
    eslint({ emitWarning: false, failOnError: true }),
  ],
});
