import fs from 'node:fs';
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

fs.rmSync('./out', { force: true, recursive: true });

export default defineConfig({
  input: [
    'runtime/react.js',
    'runtime/react-dom.js',
    'runtime/react-dom-client.js',
    'runtime/jsx-runtime.js',
    'runtime/jsx-dev-runtime.js',
  ],
  plugins: [
    nodeResolve(),
    commonjs({
      defaultIsModuleExports: true,
      requireReturnsDefault: true,
    }),
    // TODO: plugin https://rollupjs.org/plugin-development/#this-getmoduleinfo
  ],
  preserveEntrySignatures: 'strict',
  output: {
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    assetFileNames: '[name].[ext]',
    // dir: '/static/vendor',
    dir: './out',
    format: 'esm',
    esModule: false,
    interop: "esModule",
    minifyInternalExports: true,
  },
});

// TODO: use when manualChunks are implemented?
// const runtimeIds = [
//   'react',
//   'react/jsx-dev-runtime',
//   'react/jsx-runtime',
//   'react-dom',
//   'react-dom/client',
// ];
