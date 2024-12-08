import fs from 'node:fs';

import { defineConfig } from 'rolldown';

fs.rmSync('./out', { force: true, recursive: true });

const runtimePlugin = ({ ids }) => {
  const vendorize = (value) => `vendor-${value.replaceAll('/', '-')}`;

  const mapping = {
    idToDash: new Map(),
    dashToId: new Map(),
  };

  for (const id of ids) {
    const dash = vendorize(id);
    mapping.idToDash.set(id, dash);
    mapping.dashToId.set(dash, id);
  }

  return {
    name: 'vendor-runtime-plugin',
    options(options) {
      const input = options.input || [];

      const virtualIds = ids.map((id) => vendorize(id));
      return {
        ...options,
        input: [].concat(input).concat(virtualIds),
      };
    },
    async resolveId(id) {
      const dashed = mapping.dashToId.get(id);
      if (dashed) {
        console.log('resolved:', id, 'to:', dashed);
        return id;
      }

      return null;
    },

    async load(id) {
      if (id.startsWith('vendor-')) {
        const mapped = mapping.dashToId.get(id);
        console.log('mapped:', id, 'to', mapped);

        const resolved = await this.resolve(mapped);
        console.log('resolved:', mapped, 'to', resolved.id);

        return this.load({ id: resolved.id, resolveDependencies: true });
      }

      return null;
    },
  };
};

const runtimeIds = ['react', 'react/jsx-dev-runtime', 'react/jsx-runtime', 'react-dom', 'react-dom/client'];

export default defineConfig({
  plugins: [runtimePlugin({ ids: runtimeIds })],
  output: {
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    assetFileNames: '[name].[ext]',
    dir: './out',
    format: 'esm',
  },
});
