// base
const path = require("path");
const webpack = require('webpack')
const fs = require('fs')
// plugins
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")


const pages = fs
   .readdirSync(path.resolve(__dirname, 'src/pages'))
   .filter(fileName => fileName.endsWith('.html'))
   .map(htmlPath => ({
     template: path.resolve(__dirname,  `./src/pages/${htmlPath}`),
     filename: htmlPath,
   }))



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
        use: [
           'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
           'postcss-loader',
           'sass-loader'
        ],
      },
    ]
  },
  plugins: [
     ...pages.map(options => (
        new HtmlWebpackPlugin({
          ...options
        })
     )),
    new CopyPlugin({
      patterns: [
        { from: "src/img", to: 'img' },
        { from: 'src/styles', to: 'styles' },
      ],
    }),
    new CleanWebpackPlugin(),
  ]
}
