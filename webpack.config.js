const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'webpack-report.html',
    openAnalyzer: false,
  }),
];

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './client.jsx',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins,
};
