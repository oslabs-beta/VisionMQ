const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: './client/main.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      '/': 'http://localhost:3005',
      '/load': 'http://localhost:3005',
      // '/api/*': {
      //   target: 'http://localhost:15672/',
      //   auth: 'guest:guest',
      // },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Dev',
      filename: 'index.html',
      template: './index.html',
    }),
  ],
};
