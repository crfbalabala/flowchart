const path      = require('path')
const webpack   = require('webpack');
const jquery    = require('jquery');
const precss    = require('precss');
const UglifyJSPlugin        = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin    = require("clean-webpack-plugin");
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const autoprefixer          = require('autoprefixer');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const OptimizeCSSPlugin     = require('optimize-css-assets-webpack-plugin');
const PostCss               = require('./postcss.config.js')
/**
 * webpack hash：
 *  1.  hash
 *      这种hash是每次编译生成的唯一hash，适合chunk不多的小项目
 *      但所有资源打上同一个chunk，无法实现持久缓存
 *  2.  chunkhash
 *      这是为每个chunk计算的hash,资源不同hash不同
 *      
 * hash计算：
 *      js：[chunkhash] 由 webpack 计算
 *      css：css 的 [contenthash] 由 webpack/extract-text-webpack-plugin 计算
 *      images/fonts：[hash] 由 webpack/file-loader 计算
 */


module.exports = {

    // devtool: 'cheap-module-eval-source-map',

    context: path.resolve(__dirname, 'src'),
    // 所有相对路径都是相对于context

    entry: [
      'react',
      'react-dom',
      'react-router',
      './index.js',
      './pages/entry.1.js',
    ],

    // entry: {
    //   'index': './index.js',
    //   'entry1': './pages/entry.1.js',
    // },

    /*
     * 对于entry类型，entry就是模块入口
     *    字符串：SPA。字符串对应模块在启动时就加载
     *    数组：数组内所有模块会在启动时加载，数组最后一个元素作为export
     *    对象：会打包出多个文件，具体的路径和文件名和配置有关
     */

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './build'),
        //pathinfo: true,
        filename: '[name]/entry.[chunkhash:8].js',
        chunkFilename:'js/[name].chunk.js' //require.ensure
    },

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.es6|jsx|js$/,
                exclude: /node_modules/,
                loaders: ['jsx-loader', 'babel-loader'],
            },{
                test: /\.html$/,
                loader: 'html-loader',
            },{
                test: /\.css$/,
                include: path.resolve(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },{
                test: /\.scss$/,
                include: path.resolve(__dirname, './'),
                use: ExtractTextPlugin.extract({
                    use: [{
                          loader: 'css-loader',
                          options: {
                              modules: true,
                              importLoaders: 1,
                              localIdentName:'[local]___[hash:base64:5]'
                          }
                      },{
                          loader: 'postcss-loader',
                          options: PostCss
                      }
                    ]
                })
            },{
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              loader: 'url-loader',
              options: {
                limit: 15000
              }
            },
      
            {
              test:/\.(svg)$/i,
              loader: 'svg-sprite-loader',
              options: {
                limit: 15000
              }
            }
        ]
    },

    plugins:[

        new UglifyJSPlugin(),
        new CleanWebpackPlugin(['build'], {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false
        }),
        new OptimizeCSSPlugin(), 
        // new webpack.DllPlugin({
        //     path: './manifest.json',
        //     name: '[name]'
        // }),
        // new webpack.DllReferencePlugin({
        //   manifest: require('./manifest.json'),
        // }),
        new webpack.BannerPlugin({
            banner: "@LiuYaxiong"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',     
            filename: '[name]/bundle.[hash].js',
            minChunks: 4,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'webpack-runtime',
            filename: 'commons/webpack-runtime.[hash].js',
        }),
        
        new HtmlWebpackPlugin({
            title:'开发模式',
            filename: `./index.html`,
            template: `./index.html`,
            inject: 'body',
            hash: true, 
            xhtml: true,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new ExtractTextPlugin('styles.[contenthash].css')
    ],

    externals:{
        jquery: 'window.jQuery',
    },

    resolve:{
        modules:[ 'node_modules', path.resolve(__dirname, 'src') ],
        extensions: ['.web.js', '.js', '.jsx', '.es6', '.json'],
        alias:{
          app: path.resolve(__dirname,'src/js'),
          // 以前你可能这样引用 import { Nav } from '../../components'
          // 现在你可以这样引用 import { Nav } from 'app/components'
    
          style: path.resolve(__dirname,'src/styles')
          // 以前你可能这样引用 import '../../../styles/mixins.scss'
          // 现在你可以这样引用 import 'style/mixins.scss'
    
          // 注意：别名只能在.js文件中使用。
        }
    },

    devServer: {
        contentBase: './build/',
        host: 'localhost',
        port: 8081, // 默认8080
        inline: true, // 可以监控js变化
        hot: true, // 热启动
        compress: true,
        watchContentBase: false,
        proxy: {
            '/api': {
                target: 'https://cnodejs.org',
                secure: false
            },
            '/qqagent': {
                target: 'https://qq-ci.crfchina.com',
                secure: false
            }
        }
    }

};