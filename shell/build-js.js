import path from 'node:path';
import minimist from 'minimist';

import { rollup, watch } from 'rollup';
import { loadConfigFile } from 'rollup/loadConfigFile';

const args = minimist(process.argv.slice(2));

const { options } = await loadConfigFile(path.join(process.cwd(), 'rollup.config.js'));

if (args.watch) {
  const watcher = watch(options);

  watcher.on('event', (event) => {
    console.log('Watcher event ->', event.code);
    if (event.code === 'ERROR') {
      console.log(event.error);
    }
  });
} else {
  await rollup(options);
}
