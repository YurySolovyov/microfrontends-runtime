import { defineConfig } from 'rolldown'


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
  },
  esModule: false,
})

// const ctx = await esbuild.context({
//   logLevel: 'info',
//   entryPoints: [
//     'runtime/react.js',
//     'runtime/react-dom.js',
//     'runtime/react-dom-client.js',
//     'runtime/jsx-runtime.js',
//     'runtime/jsx-dev-runtime.js',
//   ],
//   bundle: true,
//   treeShaking: false,
//   mainFields: ['browser', 'module', 'main'],
//   keepNames: true,
//   outdir: '/static/vendor',
//   format: 'esm',
// });
