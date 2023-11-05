import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import swc from '@rollup/plugin-swc';

const env = process.env.NODE_ENV || 'development';

const plugins = [
  nodeResolve({
    extensions: ['.js', '.jsx'],
  }),
  // For JSX, mostly
  swc({
    swc: {
      jsc: {
        parser: {
          topLevelAwait: true,
          importMeta: true,
          dynamicImport: true,
          jsx: true,
          syntax: 'ecmascript',
          target: 'es2022',
        },
      },
    },
  }),
  commonjs(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
];

export default [
  {
    input: {
      vendor: './vendor.js',
    },

    plugins,

    output: {
      dir: '/static',
      sourcemap: true,
      format: 'esm',
      globals: {
        react: 'React',
        'react/jsx-runtime': 'JSXRuntime',
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReatDOMClient',
      },
    },
  },
  {
    external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'],

    input: {
      index: './index.jsx',
    },

    plugins,

    output: {
      dir: '/static',
      sourcemap: true,
      format: 'esm',
    },
  },
];
