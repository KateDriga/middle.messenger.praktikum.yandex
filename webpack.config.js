const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
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
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: './src/images/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
  ],
};
