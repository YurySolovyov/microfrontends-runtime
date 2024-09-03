import { defineConfig } from 'rolldown'

// TODO: use when manualChunks are implemented?
// const runtimeIds = [
//   'react',
//   'react/jsx-dev-runtime',
//   'react/jsx-runtime',
//   'react-dom',
//   'react-dom/client',
// ];

export default defineConfig({
  input: [
    'runtime/react.js',
    'runtime/react-dom.js',
    'runtime/react-dom-client.js',
    'runtime/jsx-runtime.js',
    'runtime/jsx-dev-runtime.js',
  ],
  output: {
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    assetFileNames: '[name].[ext]',
    dir: '/static/vendor',
    format: 'esm',
    inlineDynamicImports: true,
    esModule: false,
  },
  logLevel: 'debug',
});
