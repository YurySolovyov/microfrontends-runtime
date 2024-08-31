import { parseArgs } from 'node:util';
import * as esbuild from 'esbuild'

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    mode: { type: 'string' }
  }
});

const { mode = 'watch' } = values;

const ctx = await esbuild.context({
  logLevel: 'info',
  entryPoints: [
    'runtime/react.js',
    'runtime/react-dom.js',
    'runtime/react-dom-client.js',
    'runtime/jsx-runtime.js',
    'runtime/jsx-dev-runtime.js',
  ],
  bundle: true,
  treeShaking: false,
  mainFields: ['browser', 'module', 'main'],
  keepNames: true,
  outdir: '/static/vendor',
  // target: 'es2022',
  format: 'esm',
});

if (mode === 'watch') {
  await ctx.watch();
} else {
  await ctx.rebuild();
  ctx.dispose();
}
