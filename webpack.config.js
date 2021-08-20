const fs = require('fs');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const isDevTool = isDev ? 'source-map' : false;
const isTarget = isDev ? 'web' : 'browserslist';

const filename = (extension) => {
  return isProd ? `[name].[hash].${extension}` : `[name].${extension}`;
};

const cssLoaders = (loaderExtra) => {
  const postcssLoaderOptions = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer'],
      },
    },
  };

  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    postcssLoaderOptions,
  ];

  if (loaderExtra) {
    loaders.push(loaderExtra)
  }

  return loaders;
};

const babelOptions = (...presetExtra) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: [],
  };

  if (presetExtra) {
    options.presets.push(...presetExtra);
  }

  return options;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/index.tsx',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    watchContentBase: true,
    port: 8082,
    open: true,
    writeToDisk: isProd,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new WebpackNotifierPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'build/assets'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript'),
        },
      },
      {
        test: /\.tsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react', '@babel/preset-typescript'),
        },
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            // useRelativePath: true,
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
  devtool: isDevTool,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  performance: {
    assetFilter(assetFilename) {
      return !/\.(map|png|jpe?g|webp)$/.test(assetFilename);
    },
  },
};
