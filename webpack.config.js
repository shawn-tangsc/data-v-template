const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const envConfigPath = {
  development: path.resolve(__dirname, '.env.development'),
  production: path.resolve(__dirname, '.env.production'),
}

console.log(envConfigPath)
dotenv.config({
  path: envConfigPath[process.env.NODE_ENV],
}).parsed
console.log(process.env.NODE_ENV)
const isProduction = process.env.NODE_ENV === 'production'
const stringifiedEnv = JSON.stringify(process.env)

const config = {
  entry: {
    App: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, './electron-quick-start/dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: './' }],
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new DefinePlugin({
      'process.env': stringifiedEnv,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve('./src')],
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|gltf|glb)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      process: 'process/browser',
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
  devServer: {
    open: false,
    host: 'localhost',
    proxy: {
      '/mock': {
        target: 'https://mock.mengxuegu.com/mock/62abda3212c1416424630a45', // easymock
        changeOrigin: true,
        pathRewrite: { '^/mock': '' },
      },
    },
  },
}
module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
  } else {
    config.mode = 'development'
  }
  return config
}
