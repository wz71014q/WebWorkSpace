const webpack = require('webpack');
const program = require('commander');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const ora = require('ora');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const shell = require('shelljs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const speedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const smp = new speedMeasurePlugin();
const spinner = ora({
  spinner: {
    frames: ['←', '↑', '→', '↓'],
    interval: 80,
  },
  color: 'red',
  text: 'Loading...',
});

const plugins = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8900
    })
  ]
}
program
  .command('project <project> [file]')
  .action((project, file) => {
    const entry = path.resolve(__dirname, '../../', 'projects', project, file, 'main.js');
    let inlineConfig = merge(baseConfig, {
      entry: function setEntry() {
        return entry; // 入口文件
      },
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              'vue-style-loader',
              'style-loader',
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true, // 指定使用CSS modules
                  localIdentName: '[local]', // 指定css的类名格式
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: './',
                  },
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                },
              },
            ],
          },
        ],
      },
      optimization: {
        minimizer: [
          new TerserPlugin({
            exclude: /\.min\.js$/, // 排除项
            parallel: true, // 开启并行压缩，充分利用cpu
            extractComments: false, // 移除注释
            terserOptions: {
              compress: {
                unused: true,
                drop_debugger: true
              },
              output: {
                comments: false // 移除注释
              }
            }
          })
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash:8].css',
          chunkFilename: '[id].css',
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessorOptions: {
            safe: true,
            autoprefixer: { disable: true },
            mergeLonghand: false,
            discardComments: {
              removeAll: true, // 移除注释
            },
          }
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname,'../../', 'projects', project, file, 'index.html'), // template
          minify: {
            removeAttributeQuotes: true, // 删除注释
            collapseWhitespace:true //删除空白符与换行符
          },
          filename: 'index.html',
        }),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: ['Your application build succeed\n'],
          },
        }),
        new CleanWebpackPlugin()
        // new CopyWebpackPlugin([
        //   {
        //       from: path.resolve(__dirname, '../../', 'projects/static'),
        //       to: path.resolve(__dirname, '../../dist'),
        //       ignore: ['.*']
        //   }
        // ])
      ],
      performance: {
        hints: 'warning',
        maxEntrypointSize: 5000000,
        // 最大单个资源体积，默认250000 (bytes)
        maxAssetSize: 3000000,
      },
    });
    spinner.start();
    if (fs.existsSync(path.resolve(__dirname, '../../dist'))) {
      rimraf.sync(path.resolve(__dirname, '../../dist'))
    }
    if (process.env.NODE_ENV === 'analyze') {
      inlineConfig = smp.wrap(merge(inlineConfig, plugins));
    }
    webpack(inlineConfig, (err, stats) => {
      spinner.stop();
      if (err) {
        console.log(err);
      }
      console.log('build succeed');
    });
  });

program.parse(process.argv);
