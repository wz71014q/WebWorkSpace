const path = require('path'); 
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../../'),
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../../dist'), // 打包后的文件存放的地方
    filename: '[name].[hash:8].js'// 打包后输出文件的文件名
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /(\.html|\.xml)$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]",
          publicPath: "./images/",
          outputPath: "images/"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({}),
  ],
};