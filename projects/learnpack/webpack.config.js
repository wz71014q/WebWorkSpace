const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: __dirname + '/app/main.js', // 已多次提及的唯一入口文件
  output: {
    path: __dirname + '/build', // 打包后的文件存放的地方
    filename: 'bundle.js'// 打包后输出文件的文件名
  },
  devtool: 'sourse-map',
  devServer: {
    contentBase: './build', // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    port: 3003
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
            // test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
            // loader：loader的名称（必须）
            // include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
            // query：为loaders提供额外的设置选项（可选）
          }, {
            loader: 'css-loader',
            options: {
              modules: true, // 指定使用CSS modules
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            }
          }, {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html' // new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin()// 热加载插件
  ],
};
