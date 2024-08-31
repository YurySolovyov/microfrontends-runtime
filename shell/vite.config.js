import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
  css: {
    transformer: 'lightningcss',
  },
  build: {
    cssCodeSplit: true,
    emptyOutDir: false,

    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/client',
      ],
      output: {
        minifyInternalExports: false,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },

    target: 'es2022',
    modulePreload: { polyfill: false },
    outDir: '/static',

    lib: {
      entry: {
        index: './index.jsx',
        style: './style.css',
      },
      formats: ['es'],
    },
  },
});
