import path from 'node:path';

import minimist from 'minimist';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const args = minimist(process.argv.slice(2));

export default {
  mode: args.release ? 'production' : 'development',
  entry: './src/shell/index.js',
  output: {
    path: path.resolve(process.cwd(), './public/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'style.css' })],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        resolve: {
          fullySpecified: false,
        },
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
