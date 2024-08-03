import path from 'node:path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const externals = [
  'react',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'react-dom',
  'react-dom/client',
];

export default defineConfig({
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    react({ devTarget: 'es2022' }),
  ],
  define: {
    'process.env.NODE_ENV': "'development'",
  },

  build: {
    modulePreload: { polyfill: false },
    outDir: path.join('/apps', process.env.APP_NAME),

    rollupOptions: {
      external: externals,
      output: {
        minifyInternalExports: false,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },

    lib: {
      entry: {
        index: './index.jsx',
      },
      formats: ['es'],
    },
  }
});
