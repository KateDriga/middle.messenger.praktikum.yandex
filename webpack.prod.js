const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,

              {
                loader: 'css-loader',
                options: { importLoaders: 1, modules: true },
              },
              'sass-loader',
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style-[contenthash].css',
    }),
  ],
});
