import * as esbuild from 'esbuild';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const ctx = await esbuild.context({
  entryPoints: ['style.css'],
  bundle: true,
  outdir: '/static',
  sourcemap: true,
});

if (args.watch) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
