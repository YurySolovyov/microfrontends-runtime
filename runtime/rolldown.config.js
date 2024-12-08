import fs from 'node:fs';

import { defineConfig } from 'rolldown';

const out = '/static/vendor';
// const out = './out';

fs.rmSync(out, { force: true, recursive: true });

const runtimePlugin = ({ ids }) => {
  const vendorize = (value) => `vendor-${value.replaceAll('/', '-')}`;

  const mapping = {
    idToVendor: new Map(),
    vendorToId: new Map(),
  };

  for (const id of ids) {
    const dashed = vendorize(id);
    mapping.idToVendor.set(id, dashed);
    mapping.vendorToId.set(dashed, id);
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
    resolveId(id) {
      if (mapping.vendorToId.has(id)) {
        return id;
      }

      return null;
    },

    async load(id) {
      if (id.startsWith('vendor-')) {
        const mapped = mapping.vendorToId.get(id);

        // H A C K
        const mod = await import(mapped);
        // H A C K

        return `export {${Object.keys(mod).join(',')}} from '${mapped}';`;
      }

      return null;
    },
  };
};

const runtimeIds = ['react', 'react/jsx-dev-runtime', 'react/jsx-runtime', 'react-dom', 'react-dom/client'];

export default defineConfig({
  plugins: [runtimePlugin({ ids: runtimeIds })],
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  output: {
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    assetFileNames: '[name].[ext]',
    dir: out,
    format: 'esm',
  },
});
