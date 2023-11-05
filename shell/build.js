import * as esbuild from 'esbuild';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const app = await esbuild.context({
  entryPoints: ['index.jsx', 'style.css'],
  bundle: true,
  outdir: '/static',
  format: 'esm',
  target: 'es2022',
  sourcemap: true,
  external: ['react', 'react/jsx-runtime', 'react-dom'],
});

const vendor = await esbuild.context({
  entryPoints: ['vendor.js'],
  bundle: true,
  outdir: '/static',
  format: 'esm',
  target: 'es2022',
  sourcemap: true,
});

if (args.watch) {
  await Promise.all([app.watch(), vendor.watch()]);
} else {
  await Promise.all([app.rebuild().then(() => app.dispose()), vendor.rebuild().then(() => vendor.dispose())]);
}
