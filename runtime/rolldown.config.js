import fs from 'node:fs';
import crypto from 'node:crypto';

import { defineConfig } from 'rolldown';

fs.rmSync('./out', { force: true, recursive: true });

const runtimePlugin = ({ ids }) => {
  const mapping = {
    idToHash: new Map(),
    hashToId: new Map(),
  };

  for (const id of ids) {
    const hash = `mod_${crypto.hash('sha256', id)}`;
    mapping.idToHash.set(id, hash);
    mapping.hashToId.set(hash, id);
  }

  return {
    name: 'vendor-runtime-plugin',
    async resolveId(id, importer) {
      if (id === 'vendor') {
        return id;
      }

      if (importer === 'vendor') {
        return mapping.idToHash.get(id);
      }

      return null;
    },

    async load(id) {
      if (id === 'vendor') {
        return ids.map((moduleId) => `export * from '${moduleId}';`).join('\n');
      }

      const mapped = mapping.hashToId.get(id);
      if (mapped) {
        return `export * from '${mapped}';\n`;
      }

      return null;
    },
    renderStart(...rest) {
      console.log(rest);

      return null;
    },
  };
};

export default defineConfig({
  input: 'vendor',
  plugins: [
    runtimePlugin({
      ids: ['react/jsx-dev-runtime', 'react/jsx-runtime', 'react', 'react-dom', 'react-dom/client'],
    }),
  ],
  output: {
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    assetFileNames: '[name].[ext]',
    dir: './out',
    format: 'esm',
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
