const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const developmentLoaders = [
  {
    loader: 'thread-loader',
    options: process.env.WEBPACK_WATCH_MODE === 'true' ? { poolTimeout: Infinity } : {},
  },
  'cache-loader',
]
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // Webpack tries resolving unused peer dependencies of our dependencies, so we just mock them
    alias: {
      'fastify-swagger$': path.resolve(__dirname, '/empty-module.js'),
      '@nestjs/websockets/socket-module$': path.resolve(__dirname, '/empty-module.js'),
      '@nestjs/microservices/microservices-module$': path.resolve(__dirname, '/empty-module.js'),
      'class-transformer/storage$': path.resolve(__dirname, '/empty-module.js'),
      'amqp-connection-manager$': path.resolve(__dirname, '/empty-module.js'),
      amqplib$: path.resolve(__dirname, '/empty-module.js'),
      mqtt$: path.resolve(__dirname, '/empty-module.js'),
      nats$: path.resolve(__dirname, '/empty-module.js'),
      kafkajs$: path.resolve(__dirname, '/empty-module.js'),
      '@prisma/types': path.resolve(__dirname, 'prisma/client'),
    },
    modules: [path.resolve(__dirname), 'node_modules'],
  },
  plugins: isDevelopment ? [new ForkTsCheckerWebpackPlugin()] : [],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          ...(isDevelopment ? developmentLoaders : []),
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
}
