const program = require('commander');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServer = require('./devServer');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');

program
  .command('val <val> [prop]')
  .option('-a, --peppers', 'Add peppers')
  .option('-p, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .action((val, cmd) => {
    console.log(val);
    console.log(cmd);
  })
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);

program.parse(process.argv);


module.exports = {
  mode: 'production',
  entry: {
    main: __dirname + '/projects/webpackSpace/main.js', // 入口文件
  },
  output: {
    path: __dirname + '/dist', // 打包后的文件存放的地方
    filename: 'bundle.js'// 打包后输出文件的文件名
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }
  },
  // devtool: 'source-map',
  devServer,
  module: {
    rules: [
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
        test: /(\.css)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, // 指定使用CSS modules
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            },
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html' // new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running: http://${devServer.host}:${devServer.port}\n`],
      },
    })
  ],
};
