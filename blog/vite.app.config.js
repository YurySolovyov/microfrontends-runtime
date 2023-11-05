import { defineConfig } from 'vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/** @type {import('vite').UserConfig} */
const config = {
  esbuild: {},
  plugins: [nodeResolve()],
  server: {
    cors: {},
  },
  build: {
    rollupOptions: {
      input: './index.jsx',
      output: {
        format: 'esm',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react/jsx-runtime', 'react-dom'],
    },
  },
};

export default defineConfig(config);
