// base
const path = require("path");
const webpack = require('webpack')
// plugins
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    open: true,
    hot: false,
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack template',
      template: path.resolve(__dirname, './src/index.html'),
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/img", to: 'img' },
      ],
    }),
    new CleanWebpackPlugin(),
  ]
}
