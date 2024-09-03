import { parseArgs } from 'node:util';
import { rollup, watch } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const { values: { mode = 'watch' } = {} } = parseArgs({
  args: process.argv.slice(2),
  options: {
    mode: { type: 'string' }
  }
});

const output = {
  chunkFileNames: '[name].js',
  entryFileNames: '[name].js',
  assetFileNames: '[name].[ext]',
  dir: '/static/vendor',
  format: 'esm',
  esModule: false,
  preserveModules: true,
  interop: "esModule",
};

const inputs = [
  'runtime/react.js',
  'runtime/react-dom.js',
  'runtime/react-dom-client.js',
  'runtime/jsx-runtime.js',
  'runtime/jsx-dev-runtime.js',
];

const options = {
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
  logLevel: 'debug',
  preserveEntrySignatures: 'strict',
}

if (mode === 'watch') {
  const watcher = watch(options);

  watcher.on('event', (event) => {
    if (event.code === 'ERROR') {
      console.log(event.error);
    }
  });
} else {
  const bundle = await rollup(
    inputs.map((input) => ({ ...options, input })),
  );

  await bundle.write(output);
  await bundle.close();
}

// TODO: use when manualChunks are implemented?
// const runtimeIds = [
//   'react',
//   'react/jsx-dev-runtime',
//   'react/jsx-runtime',
//   'react-dom',
//   'react-dom/client',
// ];
