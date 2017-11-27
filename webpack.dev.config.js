const path      = require('path')
const webpack   = require('webpack');
const jquery    = require('jquery');
const precss    = require('precss');
const UglifyJSPlugin        = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin    = require("clean-webpack-plugin");
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const autoprefixer          = require('autoprefixer');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const PostCss               = require('./postcss.config.js')



module.exports = {

    context: path.resolve(__dirname, 'src'),

    entry: {
      app: 'index.js',
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './build'),
        // pathinfo: true,
        filename: '[name]/entry.[chunkhash].js',
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
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },{
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/component'),
                use: [
                  'style-loader',
                  {
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
            },{
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                  'style-loader',
                  'css-loader',
                  {
                    loader: 'postcss-loader',
                    options: {
                      parser: 'postcss-scss'
                    }
                  }
                ]
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

        //new UglifyJSPlugin(),
        new CleanWebpackPlugin(['build'], {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false
        }),
        new webpack.BannerPlugin({
            banner: "@LiuYaxiong"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            __DEV__: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',     
            filename: '[name]/bundle.[hash].js',
            minChunks: 2,
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
    
          style: path.resolve(__dirname,'src/styles'),
          // 以前你可能这样引用 import '../../../styles/mixins.scss'
          // 现在你可以这样引用 import 'style/mixins.scss'
    
          // 注意：别名只能在.js文件中使用。

         
        }
    },

};