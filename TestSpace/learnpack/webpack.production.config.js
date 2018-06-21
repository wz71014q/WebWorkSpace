// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ // ExtractTextPlugin插件分离CSS和JS文件
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true,
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader"
                }],
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        // new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin('build/*.*', {
          root: __dirname,
          verbose: true,
          dry: false
      })
        // OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        // UglifyJsPlugin：压缩JS代码,4版本已删除，设置mode=production就会自动压缩；
        // ExtractTextPlugin：分离CSS和JS文件,4.0后已不再内置
    ],
};
